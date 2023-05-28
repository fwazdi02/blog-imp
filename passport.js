const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
var JWTstrategy = require("passport-jwt").Strategy,
    ExtractJWT = require("passport-jwt").ExtractJwt
const { User, hashPassword } = require("./models/User")

passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const hash_password = await hashPassword(password)
                const user = await User.findOne({ email, password: hash_password })
                if (!user) {
                    return done(null, false, { message: "Email / Password maybe wrong" })
                }
                return done(null, user, { message: "Logged in Successfully" })
            } catch (error) {
                return done(error)
            }
        },
    ),
)
passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.APP_JWT_KEY,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            try {
                return done(null, token.user)
            } catch (error) {
                done(error)
            }
        },
    ),
)
