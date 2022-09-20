import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import { getCommentByMovie } from "../../../api/comment";
import { useNotification } from "../../../hooks";

const getNameInitial = (name = "") => {
  return name[0].toUpperCase();
};

export default function CommentsList() {
  const [comments, setComments] = useState([]);

  const { movieId } = useParams();

  const { updateNotification } = useNotification();

  const fetchComments = async () => {
    const { movie, comments, error } = await getCommentByMovie(movieId);
    if (error) return updateNotification("error", error);

    setComments([...comments]);
  };

  useEffect(() => {
    if (movieId) fetchComments({ comments });
  }, [movieId]);
  return (
    <div className=' bg-slate-900 dark:text-white text-secondary ml-10 mr-10 h-50 overflow-hidden'>
      <ul className='space-x-4'>
        <>
          {comments.length <= 0 ? (
            <h1 className='text-yellow-400 text-lg text-center'>No Comments</h1>
          ) : (
            <div className='space-y-3 mt-3'>
              {comments.map((comment) => (
                <CommentCard comment={comment} key={comment.id} />
              ))}
            </div>
          )}
        </>
      </ul>
    </div>
  );
}

const CommentCard = ({ comment }) => {
  if (!comment) return null;

  const { user, content } = comment;

  return (
    <div className='flex space-x-3'>
      <div className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 dark:bg-dark-subtle text-white text-xl select-none'>
        {getNameInitial(user.name)}
      </div>
      <div>
        <h1 className='dark:text-white text-blue-300 font-semibold text-lg'>
          {user.name}
        </h1>
        <p className=' text-white dark:text-dark-subtle'>
          {content}
          <span className='ml-10 text-xs'>
            {/* <Moment fromNow ago>
              {comment.createdAt}
            </Moment> */}
          </span>
        </p>
      </div>
    </div>
  );
};
