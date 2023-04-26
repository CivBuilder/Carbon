const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'TOP_SECRET',
            jwtFromRequest: ExtractJWT.fromHeader('secrettoken')
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            console.log(email, password, done);
            try {
                const user = await User.create({
                    username: email,
                    email: email,
                    password: password,
                    sustainability_score: 0,
                    global_score: 0
                });

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ where: { email: email } })
                if (!user) {
                    console.log("User not found");
                    return done(null, false, { message: "User not found" })
                }

                const validate = await bcrypt.compare(password, user.password);
                if (!validate) {
                    console.log("Bad password");
                    return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, user, { messgae: 'Logged in' });
            } catch (error) {
                console.error(error);
                return done(error);
            }
        }
    )
);