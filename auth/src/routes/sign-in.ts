import express, { Request, Response} from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { BadRequestError, validateRequest } from "@alligators/common";
import { User } from "../models/user";
import { PasswordManager } from "../services/password-manager";

const router = express.Router();

router.post('/api/users/signIn', 
    [
        body('email')
            .isEmail()
            .withMessage(`Email must be valid`),
        body('password')
            .trim()
            .notEmpty()
            .withMessage(`You must supply a password`)
    ], 
    validateRequest,
    async (req: Request, res: Response) => {
        // Check if user is register
        const { email, password } = req.body;
       
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError(`Login failed`);
        }
        
        // check if password is matched
        const passwordMatch = await PasswordManager.compare(existingUser.password, password);
        if (!passwordMatch) {
            throw new BadRequestError(`Login failed`);
        }
        
        // generate JWT
		const userJwt = jwt.sign({
			id: existingUser.id,
			email: existingUser.email
		}, process.env.JWT_KEY!);

		// Store it on the session object
		req.session = {
			jwt: userJwt
		};

		res.status(200).send(existingUser);
    }
);

export { router as signInRouter };
