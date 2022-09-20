import React, { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { addComment } from "../../../api/comment";
import { useAuth, useNotification } from "../../../hooks";
// import CommentsList from "../../admin/comment/CommentsList";

export default function AddComment({ busy, onSuccess, comments }) {
  const [content, setContent] = useState("");
  const { movieId } = useParams();
  const { updateNotification } = useNotification();

  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();

  const handleOnChange = ({ target }) => {
    setContent(target.value);
    // console.log(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return navigate("/auth/signin");
    const { error, message, comments } = await addComment(movieId, content); // call the content and movieId from backend
    if (error) return updateNotification("error", error);

    // push and display the content on database
    const newComment = {
      content,
    };

    updateNotification("success", message);
    onSuccess(comments);
    setContent(newComment);
    setContent("");
  };

  return (
    <div className='p-5'>
      <br />

      {/* Comment Lists */}
      {/* <CommentsList movieId={movieId} /> */}

      {/* Root Comment Form */}

      {/* Form */}
      <form
        className='flex '
        onSubmit={handleSubmit}
        busy={busy}
        comments={comments}
      >
        <textarea
          value={content}
          onChange={handleOnChange}
          type='text'
          autoComplete='text'
          className='w-full h-10 rounded-md p-2 dark:text-white text-primary outline-none dark:bg-transparent bg-slate-300 resize-none dark:border-b focus:border-blue-500 overflow-hidden border-b-green-900 border-b-3'
          placeholder='Add New comment'
        />
        <br className='dark:text-white text-primary ' />
        <button
          type='submit'
          className='w-full mt-3 px-5 py-2 rounded-md text-white  bg-blue-700 hover:bg-green-800 outline-none shadow-md focus:shadow-none focus:ring-2 ring-offset-2 ring-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto'
        >
          {busy ? <ImSpinner3 className='animate-spin' /> : "Comment"}
        </button>
      </form>
    </div>
  );
}
