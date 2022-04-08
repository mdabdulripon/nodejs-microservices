import express from "express";
import 'express-async-errors';
import { json } from "express";

import { currentUser, errorHandler, NotFoundError } from "@alligators/common";
import cookieSession from "cookie-session";
import { updateProduct } from "./routes/update-product";
import { createProduct } from "./routes/create-product";
import { getSingleProductRouter } from "./routes/get-single-product";
import { getAllProductsRouter } from "./routes/get-all-products";

const app = express();

app.set('trust proxy', true); 
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test'
	})
);
app.use(currentUser);

app.use(createProduct);
app.use(getAllProductsRouter);
app.use(getSingleProductRouter);
app.use(updateProduct);

app.all('*', async (req, res, next) => {
 	throw new NotFoundError();
});

app.use(errorHandler);

export { app };