import { BASEHOST } from "../use";
import axios from "axios";

export const listProducts = async (search = "", category = "") => {
  try {
    const { data } = await axios.get(`${BASEHOST}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        search,
        category,
      },
    });
    return data;
  } catch (error) {
    const message = error?.response?.data?.error || error.message;
    throw new Error(message);
  }
};

export const listCategories = async () => {
  try {
    const { data } = await axios.get(`${BASEHOST}/categories`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    const message = error?.response?.data?.error || error.message;
    throw new Error(message);
  }
};