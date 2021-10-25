const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(
    'signup',
    new localStrategy(
        {
            username: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const user = await User.create({ email, password });
                done(null, user);
            } catch (e) {
                done(e);
            }
        }
    )
);

passport.use(
    'login',
    new LocalStrategy(
        {
            username: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) return done(null, false, { message: 'Usuario no encontrado' });
                done();
            } catch (e) {
                done(e);
            }
        }
    )
);
