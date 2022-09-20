import React, { useState } from "react";
import { updateCategory } from "../../api/category";
import { useNotification } from "../../hooks";
import CategoryForm from "../form/CategoryForm";
import ModalContainer from "./ModalContainer";

export default function EditCategoryModal({
  visible,
  initialState,
  onSuccess,
  onClose,
}) {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, message } = await updateCategory(initialState._id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);

    onSuccess({ ...data });
    updateNotification("success", message);
    onClose();
  };
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <CategoryForm
        title='Update Category'
        busy={busy}
        initialState={initialState}
        onSubmit={!busy ? handleSubmit : null}
        btnTitle='Update Category'
      />
    </ModalContainer>
  );
}
