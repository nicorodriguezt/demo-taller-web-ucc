import api from "../utils/axios";
import type { User } from "../Types/User";



export async function getUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>("/users");
  return data;
}

export async function createUser(payload: Omit<User, "id">): Promise<User> {
  const { data } = await api.post<User>("/users", payload);
  return data;
}