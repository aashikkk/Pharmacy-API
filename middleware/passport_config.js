const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../model/db");

passport.use(
	new LocalStrategy(
		{ usernameField: "username", passwordField: "password" },
		(username, password, done) => {
			db.get(
				"SELECT * FROM users WHERE username = ?",
				[username],
				(err, user) => {
					if (err) {
						console.log("err : ", err);
						return done(err);
					}

					if (!user) {
						console.log("No user found");
						return done(null, false, {
							message: "Incorrect username or password",
						});
					}

					if (user.password !== password) {
						console.log("Incorrect password");
						return done(null, false, {
							message: "Incorrect password",
						});
					}
					return done(null, user);
				}
			);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.user_id);
});

passport.deserializeUser((user_id, done) => {
	db.get("SELECT * FROM users WHERE user_id = ?", [user_id], (err, user) => {
		done(err, user);
	});
});

module.exports = passport;
