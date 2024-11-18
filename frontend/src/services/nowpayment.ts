import axios from "axios";
import {
  ICreatePaymentRequest,
  ICreatePaymentResponse,
  ICurrenciesResponse,
  IEstimateResponse,
  IMinAmountParams,
  IMinAmountResponse,
} from "../types/nowpayment";

const apiKey = import.meta.env.VITE_NOWPAYMENT_KEY;

const nowPaymentsAPI = axios.create({
  baseURL: "https://api.nowpayments.io/v1",
  headers: {
    "x-api-key": apiKey,
  },
});

export const getMinAmount = async (
  params: IMinAmountParams
): Promise<IMinAmountResponse> => {
  try {
    const response = await nowPaymentsAPI.get<IMinAmountResponse>(
      "/min-amount",
      {
        params: {
          currency_from: params.currencyFrom,
          currency_to: params.currencyTo,
          fiat_equivalent: params.fiatEquivalent || "usd",
          is_fixed_rate: params.isFixedRate || false,
          is_fee_paid_by_user: params.isFeePaidByUser || false,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching minimum amount:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getCurrenciesWithFixedRate =
  async (): Promise<ICurrenciesResponse> => {
    try {
      const response = await nowPaymentsAPI.get<ICurrenciesResponse>(
        "/currencies",
        {
          params: {
            fixed_rate: false,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching currencies with fixed rate:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

export const getConversionEstimate = async ({
  amount,
  currencyFrom,
  currencyTo,
}: {
  amount: number;
  currencyFrom: string;
  currencyTo: string;
}): Promise<IEstimateResponse> => {
  try {
    const response = await nowPaymentsAPI.get<IEstimateResponse>("/estimate", {
      params: {
        amount,
        currency_from: currencyFrom,
        currency_to: currencyTo,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching conversion estimate:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createPayment = async (
  paymentDetails: ICreatePaymentRequest
): Promise<ICreatePaymentResponse> => {
  try {
    const response = await nowPaymentsAPI.post<ICreatePaymentResponse>(
      "/payment",
      paymentDetails
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating payment:",
      error.response?.data || error.message
    );
    throw error;
  }
};
