import React from "react";
import AddComment from "./AddComment";

export default function ReplyComment(props) {
  let renderReplyComment = () => {
    <React.Fragment>
      <div className=' ml-12 w-9/12'>
        {/* <AddComment movieId={props.movieId} /> */}
        <ReplyComment movieId={props.movieId} />
      </div>
    </React.Fragment>;
  };
  return (
    <div>
      <p className=' text-sm text-white ml-10'>View more comment(s)</p>

      {renderReplyComment}
    </div>
  );
}
