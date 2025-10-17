import nextConnect from 'next-connect';
import passport from 'passport';
import SteamStrategy from 'passport-steam';

const handler = nextConnect();

if (!global.passportInitialized) {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  passport.use(new SteamStrategy({
    returnURL: `${process.env.NEXTAUTH_URL}/api/auth/steam/return`,
    realm: `${process.env.NEXTAUTH_URL}/`,
    apiKey: process.env.STEAM_API_KEY
  }, function(identifier, profile, done) {
    return done(null, profile);
  }));

  global.passportInitialized = true;
}

handler.use(passport.initialize());

handler.get(passport.authenticate('steam'));

export default handler;
