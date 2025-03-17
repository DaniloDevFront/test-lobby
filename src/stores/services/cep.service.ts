import { httpClientPublic } from "../helpers/http-client";

const url = httpClientPublic(process.env.NEXT_PUBLIC_VIACEP_API_URL);

export const getAddressByCep = async (cep: string) => {
  return await url.get(`/${cep}/json/`);
};
