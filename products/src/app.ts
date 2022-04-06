import express from "express";
import 'express-async-errors';
import { json } from "express";

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


app.all('*', async (req, res, next) => {
 	throw new NotFoundError();
});

app.use(errorHandler);

export { app };