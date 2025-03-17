"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormData } from "./form-schema";

import { Typography, Grid2, Stack, MenuItem} from "@mui/material";
import InputCustom from "@components/inputs/input-custom";
import SelectCustom from "@components/inputs/select-custom";

import { useAddressStore } from "@stores/state/adress.store";
import { useRescueAwardsStore } from "@stores/state/redeem.store";
import { FormAdress, FormUser } from "@helpers/form-inputs";
import { renderExtrasField } from "@helpers/render-extras";

export default function FormComponent() {
  const { address,  loading: loadingCEP, fetchAddress } = useAddressStore();
  const { redeem, selectedAwards, setIsFormValid, setForm } = useRescueAwardsStore();

  const selectedItemsWithSizes = redeem?.items.filter(
    (item) => selectedAwards.includes(item.customer_product_id) && item.sizes.length > 0
  ) || [];

  const extraQuestions = redeem?.extra_questions || [];

  const {
    control,
    formState: { errors, isValid },
    watch,
    setValue,
    getValues,
  } = useForm<FormData>({
    mode: "onChange", 
    defaultValues: {
      redeemer_name: "",
      redeemer_document_number: "",
      redeemer_email: "",
      redeemer_zipcode: "",
      redeemer_street: "",
      redeemer_number: "",
      redeemer_complement: "",
      redeemer_neighborhood: "",
      redeemer_city: "",
      redeemer_state: "",
      redeemer_country: "",
      extra_question_responses: redeem?.extra_questions?.map(q => ({
        extra_question_id: q.id,
        answer: "",
      })) || [], 
      items: redeem?.items
      .filter(item => selectedAwards.includes(item.customer_product_id))
      .map(item => ({
        customer_product_id: item.customer_product_id,
        ...(item.sizes.length > 0 && { size_name: "" }),
      })) || [],
    },
  });

  const cep = watch("redeemer_zipcode");

  useEffect(() => {
    if (cep && cep.length === 8) {
      fetchAddress(cep);
    }
  }, [cep, fetchAddress]);

  useEffect(() => {
    if (address && address.logradouro) {
      setValue("redeemer_street", address.logradouro || "");
      setValue("redeemer_neighborhood", address.bairro || "");
      setValue("redeemer_city", address.localidade || "");
      setValue("redeemer_state", address.uf || "");
      setValue("redeemer_country", "Brasil");
    }
  }, [address, setValue]);

  useEffect(() => {
    if(isValid){
      setIsFormValid(isValid);
      
      const payload = getValues(); 

      setForm(payload);
    }

  }, [getValues, isValid, setForm, setIsFormValid]);

  return (
    <form >
      <Stack flexDirection="column" gap={1}>
        <Typography variant="body2" fontSize={16} fontWeight={600}>
          Dados do Destinatário
        </Typography>

        <Grid2 container spacing={3}>
          {FormUser.map((field) => (
            <Grid2 key={field.name} size={field.gridSize}>
              <Controller
                name={field.name}
                control={control}
                rules={field.rules}
                render={({ field: controllerField }) => (
                  <InputCustom
                    {...controllerField}
                    label={field.label}
                    type={field.type}
                    error={!!errors[field.name]}
                    helperText={errors[field.name]?.message}
                  />
                )}
              />
            </Grid2>
          ))}
        </Grid2>
      </Stack>

      <Stack flexDirection="column" gap={1} mt={5}>
        <Typography variant="body2" fontSize={16} fontWeight={600}>
          Endereço de Entrega
        </Typography>

        <Grid2 container spacing={3}>
          {FormAdress.map((field) => (
            <Grid2 key={field.name} size={field.gridSize}>
              <Controller
                name={field.name as keyof FormData}
                control={control}
                rules={field.rules}
                render={({ field: controllerField }) => (
                  <InputCustom
                    {...controllerField}
                    label={field.label}
                    type={field.type}
                    disabled={field.name === "redeemer_zipcode" ? loadingCEP : false} 
                    error={!!errors[field.name]}
                    helperText={
                      field.name === "redeemer_zipcode"
                        ? loadingCEP
                          ? "Buscando CEP..."
                          : errors.redeemer_zipcode?.message
                        : errors[field.name]?.message
                    }
                  />
                )}
              />
            </Grid2>
          ))}
        </Grid2>
      </Stack>

      {selectedItemsWithSizes.map((item, index) => (
        <Stack flexDirection="column" gap={1} mt={5} key={item.customer_product_id}>
          <Typography variant="body2" fontSize={16} fontWeight={600}>
            Tamanhos
          </Typography>

          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Controller
                name={`items.${index}.size_name`}
                control={control}
                rules={{ required: `Selecione um tamanho para ${item.sizes_grid?.name}` }}
                render={({ field }) => (
                  <SelectCustom {...field} value={field.value || ""} label={`Qual o seu tamanho (${item.sizes_grid?.name})`}>
                    {item.sizes.map((size, idx) => (
                      <MenuItem key={idx} value={size.name} sx={{fontSize: '14px'}}>
                        {size.name}
                      </MenuItem>
                    ))}
                  </SelectCustom>
                )}
              />
            </Grid2>
          </Grid2>
        </Stack>
      ))}

      <Stack flexDirection="column" gap={1} mt={5} >
        <Typography variant="body2" fontSize={16} fontWeight={600}>
          Perguntas Extras
        </Typography>

        <Grid2 container spacing={4} mt={2}>
          {extraQuestions
            .sort((a, b) => a.position - b.position)
            .map((item, index) => (
              <Grid2 key={item.id} size={{ xs: 12, md: item.answer_type === 'text_area' ? 12 : 6 }}>
                <Controller
                  name={`extra_question_responses.${index}.answer`} 
                  control={control}
                  rules={{ required: `Responda: ${item.question}` }}
                  render={({ field }) =>
                    renderExtrasField({ field, item, index, errors }) 
                  }
                />
              </Grid2>
          ))}
        </Grid2>
      </Stack>
    </form>
  );
}
