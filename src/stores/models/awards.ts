export interface REDEEM {
  id: string;
  status: string;
  title: string;
  welcome_title: string;
  welcome_phrase: string;
  logo_url: string;
  background_color: string;
  button_color: string;
  items: ITEM[];
  extra_questions: EXTRA_QUESTION[];
}

export interface ITEM {
  customer_product_id: string;
  name: string;
  quantity: number;
  optional: boolean;
  image_url: string;
  sizes_grid: SIZES_GRID | null;
  sizes: SIZE[];
}

export interface SIZES_GRID {
  name: string;
}

export interface SIZE {
  id: string;
  name: string;
}

export interface EXTRA_QUESTION {
  id: number;
  answer_type: string;
  question: string;
  position: number;
  options: string[];
}
