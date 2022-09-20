import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../../api/comment";

export default function Comments() {
  const [allComment, setAllComment] = useState([]);
  // const [movieTitle, setMovieTitle] = useState("");

  const { movieId } = useParams();

  const fetchComments = async () => {
    const res = await getComments(movieId);

    setAllComment(res);
  };

  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div className='bg-white shadow dark:shadow dark:bg-secondary p-5 rounded pt-10'>
      <h1 className='font-semibold text-2xl mb-4 text-primary dark:text-white border-b text-center'>
        Comments
      </h1>
      <ul className=' space-x-4 '>
        {allComment.map((c, index) => {
          return (
            <li key={index} className='mb-4'>
              <p
                onClick={() => getComments(c.content)}
                className='mb-2 font-semibold dark:text-white text-primary mt-4'
              >
                {c.content}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
