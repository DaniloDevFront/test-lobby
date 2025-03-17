/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid2Props } from "@mui/material";
import { FormData } from "../components/form/form-schema";

type FormFieldName = keyof FormData;

export interface FormField {
  name: FormFieldName;
  label: string;
  type?: "text" | "email" | "number" | "date";
  rules?: any;
  gridSize?: Grid2Props["size"];
}

export const FormUser: FormField[] = [
  {
    name: "redeemer_name",
    label: "Nome",
    rules: {
      required: "Nome é obrigatório",
      minLength: { value: 3, message: "Mínimo 3 caracteres" }
    },
    gridSize: 12
  },
  {
    name: "redeemer_document_number",
    label: "CPF ou CNPJ",
    rules: {
      required: "CPF ou CNPJ é obrigatório",
      minLength: { value: 11, message: "Documento inválido" }
    },
    gridSize: { xs: 12, md: 6 }
  },
  {
    name: "redeemer_email",
    label: "E-mail",
    type: "email",
    rules: {
      required: "E-mail é obrigatório",
      pattern: { value: /^\S+@\S+\.\S+$/, message: "E-mail inválido" }
    },
    gridSize: { xs: 12, md: 6 }
  },
];

export const FormAdress: FormField[] = [
  {
    name: "redeemer_zipcode",
    label: "CEP",
    rules: {
      required: "CEP é obrigatório",
      pattern: { value: /^\d{5}-?\d{3}$/, message: "CEP inválido" }
    },
    gridSize: { xs: 12, md: 6 }
  },
  {
    name: "redeemer_street",
    label: "Rua",
    rules: { required: "Rua é obrigatória" },
    gridSize: { xs: 12, md: 6 }
  },
  {
    name: "redeemer_number",
    label: "Número",
    type: "number",
    rules: { required: "Número é obrigatório" },
    gridSize: { xs: 6, md: 3 }
  },
  {
    name: "redeemer_complement",
    label: "Complemento",
    gridSize: { xs: 6, md: 3 }
  },
  {
    name: "redeemer_neighborhood",
    label: "Bairro",
    rules: { required: "Bairro é obrigatório" },
    gridSize: { xs: 6, md: 6 }
  },
  {
    name: "redeemer_city",
    label: "Cidade",
    rules: { required: "Cidade é obrigatória" },
    gridSize: { xs: 6, md: 6 }
  },
  {
    name: "redeemer_state",
    label: "Estado",
    rules: { required: "Estado é obrigatório" },
    gridSize: { xs: 6, md: 3 }
  },
  {
    name: "redeemer_country",
    label: "País",
    rules: { required: "País é obrigatório" },
    gridSize: { xs: 6, md: 3 }
  },
]
