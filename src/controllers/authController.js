import { register, login } from "../services/authService.js";

export async function registerUser(req, res, next) {
    try {
        const user = await register(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
}

export async function loginUser(req, res, next) {
    try {
        const { user, accessToken } = await login(req.body);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user,
            accessToken,
        });
    } catch (error) {
        next(error);
    }
}