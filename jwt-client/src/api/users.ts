import { API_URL } from "./config";

export const user = async (userId: string) => {
  const res = await fetch(`${API_URL}/users/${userId}`);
  if (!res.ok) {
    throw new Error("Failed to get user");
  }
  return await res.json();
};

export const list = async () => {
  const res = await fetch(`${API_URL}/users`);

  if (!res.ok) {
    throw new Error("Failed to get users");
  }

  return await res.json();
};
