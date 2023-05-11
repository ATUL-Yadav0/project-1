const passport = require ("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = "1050303276926-jgh4lq3tv2r0mqnmchpmpmgjvom2pp6a.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5500/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   done(null, profile);
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})