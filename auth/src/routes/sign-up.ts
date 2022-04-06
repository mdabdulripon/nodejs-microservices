import express, {Request, Response} from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { BadRequestError, validateRequest } from "@alligators/common";
import { User } from "../models/user";

const router = express.Router();

router.post('/api/users/signUp',
	[
		body('email')
			.isEmail()
			.withMessage('Email must be valid'),
		body('password')
		.trim()
		.isLength({ min: 4, max: 20})
		.withMessage('Password must be between 4 and 20 characters')	
	],
	validateRequest,
	async (req: Request, res: Response) => {
		
		// Step 1: check if email is already in user
		const { email, password } = req.body;
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw new BadRequestError('Email already in use')
		}

		// Finally: Create new users
		const user = User.build({ email, password })
		await user.save();

		// generate JWT
		const userJwt = jwt.sign({
			id: user.id,
			email: user.email
		}, process.env.JWT_KEY!);

		// Store it on the session object
		req.session = {
			jwt: userJwt
		};

		res.status(201).send(user);
	}
);

export { router as signUpRouter };
