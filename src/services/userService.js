import { getAllUsers } from "../repositories/userRepository.js";

export async function getUsers() {
    return await getAllUsers();
}