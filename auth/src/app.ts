import express from "express";
import 'express-async-errors';
import { json } from "express";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/sign-in";
import { signOutRouter } from "./routes/sign-out";
import { signUpRouter } from "./routes/sign-up";

import { errorHandler, NotFoundError } from "@alligators/common";
import cookieSession from "cookie-session";

const app = express();

app.set('trust proxy', true); 
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test'
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

export { app };