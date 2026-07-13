import bcrypt from "bcrypt";
import AppError from "../errors/AppError.js";
import { SALT_ROUNDS } from "../utils/constants.js";
import { generateAccessToken } from "../utils/generateToken.js";
import {
    findUserByEmail,
    createUser,
} from "../repositories/authRepository.js";

export async function register(userData) {
    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
        throw new AppError("Email already registered", 409);
    }

    const passwordHash = await bcrypt.hash(
        userData.password,
        SALT_ROUNDS
    );

    const user = await createUser({
        name: userData.name,
        email: userData.email,
        passwordHash,
        role: userData.role,
    });

    const { passwordHash: _, ...safeUser } = user;

    return safeUser;
}

export async function login(loginData) {
    const { email, password } = loginData;

    const user = await findUserByEmail(email);

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }

    const accessToken = generateAccessToken(user);

    const { passwordHash: _, ...safeUser } = user;

    return {
        user: safeUser,
        accessToken,
    };
}