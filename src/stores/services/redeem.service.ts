
import { FormData } from "@components/form/form-schema";
import { httpClientAuth } from "../helpers/http-client";

const url = httpClientAuth(process.env.NEXT_PUBLIC_API_URL);

export const findRedeemByID = async (id: string) => {
  return await url.get(`/v1/redeem_pages/${id}`);
};

export const createRescue = async (id: string, payload: FormData) => {
  return await url.post(`/v1/redeem_pages/${id}/redeem`, payload);
};