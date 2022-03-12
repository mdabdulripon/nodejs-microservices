import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        // ? Hashing the Password 
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;

        return `${buf.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        // ? Get the hashPassword and salt form the storedPassword
        const [hashPassword, salt] = storedPassword.split(',');

        // ? Hashing the supply Password
        const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

        return buf.toString('hex') === hashPassword;
    }
}

/**
 * TODO: https://nodejs.org/api/documentation.html
 * * Things to learn...
 * ! Buffers Module
 * ! randomBytes
 * ! toString,
 * ! Hex, UTF8,
 * ! Util Module
 * ! Promisify
 * ***/ 
