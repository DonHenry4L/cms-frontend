import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const uploadPost = async (formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/post/create", formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
