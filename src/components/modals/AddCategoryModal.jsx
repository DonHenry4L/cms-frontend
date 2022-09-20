import React from "react";
import { useParams } from "react-router-dom";
import { addCategory } from "../../api/category";
import { useNotification } from "../../hooks";
import MovieForm from "../admin/MovieForm";
import ModalContainer from "./ModalContainer";

export default function AddCategoryModal({ visible, onClose, onSuccess }) {
  const { categoryList } = useParams();
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    const { error, message, categories } = await addCategory(categoryList, data);
    if (error) return updateNotification("error", error);

    updateNotification("success", 'Category Created Successfully');
    onSuccess(categories);
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <MovieForm onSubmit={handleSubmit} />
    </ModalContainer>
  );
}

// import React from "react";
// import { useParams } from "react-router-dom";
// import { addReview } from "../../api/review";
// import { useNotification } from "../../hooks";
// import RatingForm from "../form/RatingForm";
// import ModalContainer from "./ModalContainer";

// export default function AddCategory({ visible, onSuccess, onClose }) {
//   const { movieId } = useParams();
//   const { updateNotification } = useNotification();

//   const handleSubmit = async (data) => {
//     const { error, message, reviews } = await addReview(movieId, data);
//     if (error) return updateNotification("error", error);

//     updateNotification("success", message);
//     onSuccess(reviews);
//     onClose();
//   };
//   return (
//     <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
//       <RatingForm onSubmit={handleSubmit} />
//     </ModalContainer>
//   );
// }
