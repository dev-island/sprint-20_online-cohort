import { API_URL } from "./config";

export type GetUserRequest = {
  userId: string;
  token: string | null;
};

export const user = async ({ userId, token }: GetUserRequest) => {
  if (!token) {
    throw new Error("No token, authorization denied");
  }

  const res = await fetch(`${API_URL}/users/${userId}`, {
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get user");
  }
  const { data } = await res.json();
  return data;
};

export const list = async () => {
  const res = await fetch(`${API_URL}/users`);

  if (!res.ok) {
    throw new Error("Failed to get users");
  }

  const { data } = await res.json();
  return data;
};
