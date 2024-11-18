export interface IMinAmountParams {
  currencyFrom: string;
  currencyTo: string;
  fiatEquivalent?: string; // Default: 'usd'
  isFixedRate?: boolean; // Default: false
  isFeePaidByUser?: boolean; // Default: false
}

export interface IMinAmountResponse {
  min_amount: string;
  currency_from: string;
  currency_to: string;
  fiat_equivalent: string;
}

export interface ICurrenciesResponse {
  currencies: Array<string>;
}

export interface IEstimateResponse {
  amount_from: string;
  estimated_amount: string;
  currency_from: string;
  currency_to: string;
}

export interface ICreatePaymentRequest {
  price_amount: number;
  price_currency: string;
  pay_currency: string;
  ipn_callback_url?: string;
  order_id: string;
  order_description: string;
}

export interface ICreatePaymentResponse {
  payment_id: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_currency: string;
  payment_status: string;
  pay_amount: number;
  order_id: string;
  order_description: string;
  ipn_callback_url: string;
  created_at: string;
  updated_at: string;
  purchase_id: string;
  amount_received?: string;
  payin_extra_id?: string;
  smart_contract: string;
  network: string;
  network_precision: number;
  time_limit: string;
  burning_percent?: string;
  expiration_estimate_date: string;
}
