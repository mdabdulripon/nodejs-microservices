import express from "express";
import 'express-async-errors';
import { json } from "express";
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/sign-in";
import { signOutRouter } from "./routes/sign-out";
import { signUpRouter } from "./routes/sign-up";

import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found";
import cookieSession from "cookie-session";

const app = express();
app.set('trust proxy', true); 
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: true
	})
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.all('*', async (req, res, next) => {
 	throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {

	if (!process.env.JWT_KEY) {
		throw new Error(`JWT_KEY must be defined`);
	}

	try {
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
	} catch (err) {
		console.log(err);
	}
	
	console.log(`Connected to Mongodb`);
	app.listen(3000, () => {
		console.log("Listening on port 3000!");
	});
}

start();
