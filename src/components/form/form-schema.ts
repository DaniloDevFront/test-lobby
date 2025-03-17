export interface FormData {
  redeemer_name: string;
  redeemer_document_number: string;
  redeemer_email: string;
  redeemer_zipcode: string;
  redeemer_street: string;
  redeemer_number: string;
  redeemer_complement: string;
  redeemer_neighborhood: string;
  redeemer_city: string;
  redeemer_state: string;
  redeemer_country: string;
  extra_question_responses: {
    extra_question_id: number;
    answer: string;
  }[];
  items: {
    customer_product_id: string;
    size_name?: string;
  }[];
}