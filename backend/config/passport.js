const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            // Match Email's User
            const user = await User.findOne({ email });
            if (!user) return done(null, false, { message: 'email not found' });

            // Match Password's User

            const match = await user.matchPassword(password);
            if (match) return done(null, user);

            return done(null, false, { message: 'password not found' });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    await User.findById(id, (err, user) => {
        done(err, user);
    });
});
