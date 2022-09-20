import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const addComment = async (movieId, newComment) => {
  const token = getToken();

  // console.log(newComment);
  const body = {
    content: newComment,
  };
  try {
    const { data } = await client.post(`/comments/comment/${movieId}`, body, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getComments = async () => {
  const token = getToken();
  try {
    const { data } = await client(`/comments/comment`, {
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

export const getCommentByMovie = async (movieId) => {
  const token = getToken();
  try {
    const { data } = await client(`/comments/comment/${movieId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const deleteComment = async (commentId) => {
  const token = getToken();
  try {
    const { data } = await client.delete(`/comments/comment/${commentId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
