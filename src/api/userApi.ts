import type { UsersResponse } from "../types/user";

const BASE_URL = "https://dummyjson.com/users";

export const fetchUsers = async (
  limit: number,
  skip: number,
): Promise<UsersResponse> => {
  const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  return res.json();
};

export const searchUsers = async (query: string): Promise<UsersResponse> => {
  const res = await fetch(`${BASE_URL}/search?q=${query}`);
  return res.json();
};
