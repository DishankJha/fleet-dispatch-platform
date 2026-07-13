import { getUsers as getUsersService } from "../services/userService.js";

export async function getUsers(req, res, next) {
    try {
        const users = await getUsersService();

        return res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        next(error);
    }
}