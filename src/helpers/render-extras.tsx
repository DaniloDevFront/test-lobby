/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import InputCustom from "@components/inputs/input-custom";
import SelectCustom from "@components/inputs/select-custom";
import TextAreaCustom from "@components/inputs/text-area-custom";
import InputDateCustom from "@components/inputs/input-date-custom";
import { MenuItem } from "@mui/material";
import { ControllerRenderProps } from "react-hook-form";

interface ExtraQuestion {
  id: number;
  answer_type: string;
  question: string;
  options?: string[];
}

interface Props {
  field: ControllerRenderProps<any, string>;
  item: ExtraQuestion;
  index: number;
  errors: any;
}

export const renderExtrasField = ({ field, item, index, errors }: Props) => {
  switch (item.answer_type) {
    case "text":
      return (
        <InputCustom
          {...field}
          label={item.question}
          error={!!errors.extra_question_responses?.[index]?.answer}
          helperText={errors.extra_question_responses?.[index]?.answer?.message}
        />
      );

    case "text_area":
      return (
        <TextAreaCustom
          {...field}
          label={item.question}
          multiline
          error={!!errors.extra_question_responses?.[index]?.answer}
          helperText={errors.extra_question_responses?.[index]?.answer?.message}
        />
      );

    case "select_one":
      return (
        <SelectCustom {...field} value={field.value || ""} label={item.question}>
          {item.options?.map((option, idx) => (
            <MenuItem key={idx} value={option} sx={{ fontSize: "14px" }}>
              {option}
            </MenuItem>
          ))}
        </SelectCustom>
      );

    case "date":
      return (
        <InputDateCustom
          {...field}
          label={item.question}
          error={!!errors.extra_question_responses?.[index]?.answer}
          helperText={errors.extra_question_responses?.[index]?.answer?.message}
        />
      );

    default:
      return <></>;
  }
};
