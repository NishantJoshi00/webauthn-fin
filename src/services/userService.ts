import { v4 as uuidv4 } from "uuid";
import { createUser, getUserById, getUserByUsername } from "../file";

export const userService = {
  async getUserById(userId: string) {
    const user = await getUserById(userId);
    return user;
  },

  async getUserByUsername(username: string) {
    return await getUserByUsername(username);
  },

  async createUser(username: string) {
    const user = await createUser(username);
    return user;
  },
};
