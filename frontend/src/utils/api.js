import axios from "axios";
import {
  GET_TOKENS_URL,
  POST_QUOTES_URL,
  POST_PARAMS_URL,
} from "../constants/urls";

export const fetchTokens = async () => {
  const response = await axios.post(GET_TOKENS_URL);
  return response.data;
};

export const fetchQuote = async (data) => {
  const response = await axios.post(POST_QUOTES_URL, data);
  return response.data;
};

export const fetchParams = async (data) => {
  const response = await axios.post(POST_PARAMS_URL, data);
  return response.data;
};
