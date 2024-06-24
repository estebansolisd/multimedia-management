import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../models/user";
import { User } from "../interfaces/userInterface";
import { Response, Request } from "express";

const getUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const users: User[] = await getUsers();
  res.status(200).json({ users });
};

const getUserByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const user: User | null = await getUserById(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user: User = req.body;
  await createUser(user);
  res.status(201).json({
    message: "User created",
    user,
  });
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const userUpdate: User = req.body;
  userUpdate.id = id;
  await updateUser(userUpdate);
  res.status(200).json({
    message: "User updated",
    user: userUpdate,
  });
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  await deleteUser(id);
  res.status(200).json({
    message: `User ${id} deleted`,
  });
};

export default { 
  createUserController,
  deleteUserController,
  getUserByIdController,
  getUsersController,
  updateUserController
}