import nextConnect from 'next-connect';
import passport from 'passport';
import crypto from 'crypto';
import clientPromise from '../../../../lib/mongodb';
import { serialize } from 'cookie';

const handler = nextConnect();
handler.use(passport.initialize());

handler.get(passport.authenticate('steam'), async (req, res) => {
  const profile = req.user;
  try {
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');
    const accounts = db.collection('accounts');
    const account = await accounts.findOne({ provider: 'steam', providerAccountId: profile.id });
    let userId;
    if (account) {
      userId = account.userId;
      await users.updateOne({ _id: userId }, { $set: { name: profile.displayName, image: profile._json?.avatarfull || null } });
    } else {
      const insertRes = await users.insertOne({ name: profile.displayName, email: null, emailVerified: null, image: profile._json?.avatarfull || null });
      userId = insertRes.insertedId;
      await accounts.insertOne({
        userId: userId,
        provider: 'steam',
        providerAccountId: profile.id,
        access_token: null,
        expires_at: null,
        scope: null,
        token_type: null,
        id_token: null,
        session_state: null
      });
    }

    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 30*24*60*60*1000);
    await db.collection('sessions').insertOne({ sessionToken, userId, expires });

    const cookie = serialize('next-auth.session-token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires
    });
    res.setHeader('Set-Cookie', cookie);

    return res.redirect(`${process.env.NEXTAUTH_URL}/home`);
  } catch (e) {
    console.error('Steam callback error', e);
    return res.redirect(`${process.env.NEXTAUTH_URL}/auth/signin?error=steam`);
  }
});

export default handler;
