const express = require("express");
const session = require("express-session");
const passport = require("./middleware/passport_config");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const dummyData = require("./db/dummy_data");

const app = express();
const port = 3000;

app.use(
	session({
		secret: "secretd123",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 60000, // 60 seconds (in milliseconds)
		},
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport, passport.deserializeUser);

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   console.log("Incoming Request:");
//   console.log("Method:", req.method);
//   console.log("URL:", req.url);
//   console.log("Headers:", req.headers);

//   if (req.cookies) {
//     console.log("Cookies:", req.cookies);
//   }

//   next();
// });

// Use the routes
app.use("/api/v1", routes);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
