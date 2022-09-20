import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const addCategory = async (value) => {
  const token = getToken();
  try {
    const { data } = await client.post("/category/category", value, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getCategories = async () => {
  try {
    const token = getToken();
    const { data } = await client("/category/categories", {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const updateCategory = async (slug, categoryData) => {
  const token = getToken();
  try {
    const { data } = await client.put(`/category/${slug}`, categoryData, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const deleteCategory = async (slug) => {
  const token = getToken();
  try {
    const { data } = await client.delete(`/category/${slug}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
