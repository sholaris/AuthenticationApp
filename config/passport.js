const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_SECRET;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload);
        User.getUserById(jwt_payload.data._id, (err, user) => {
            if (err) {
                return done(err, false)
            }

            if (user) {
                done(null, user)
            } else {
                return done(null, false)
            }
        })
    }))
}