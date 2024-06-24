import { ObjectId } from "mongodb";
import db from "../config/database";
import { User } from "../interfaces/userInterface";


const collection = "users";

export const getUsers = async (): Promise<User[]> => {
  const users = await db.collection<User>("users").find().toArray();
  return users;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const user = await db.collection<User>(collection).findOne({ id });
  return user;
};

export const createUser = async (user: User): Promise<ObjectId | null> => {
  const result = await db.collection<User>("users").insertOne(user);
  return result.insertedId ? result.insertedId : null;
};

export const updateUser = async (user: User): Promise<boolean> => {
  const result = await db
    .collection<User>(collection)
    .updateOne({ id: user.id }, { $set: user });
  return result.modifiedCount === 1;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const result = await db.collection<User>(collection).deleteOne({ id });
  return result.deletedCount === 1;
};
