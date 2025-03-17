import axios from "axios";

export const httpClientPublic = (baseURL?: string) => {
  if (!baseURL) {
    throw new Error("BaseURL not found");
  }

  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const httpClientAuth = (baseURL?: string) => {
  if (!baseURL) {
    throw new Error("BaseURL not found");
  }

  const username = process.env.NEXT_PUBLIC_API_KEY
  const password = "";

  const basicAuth = Buffer.from(`${username}:${password}`).toString("base64");

  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${basicAuth}`,
    },
  });
};
