import React, { useState } from "react";
import { addCategory } from "../../api/category";
import { useNotification } from "../../hooks";
import CategoryForm from "../form/CategoryForm";
import ModalContainer from "./ModalContainer";

export default function CategoryUpload({ visible, onClose }) {
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = async ({ ...value }) => {
    const { error, message } = await addCategory(value);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    setBusy(false);

    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <CategoryForm
        busy={busy}
        onSubmit={!busy ? handleSubmit : null}
        title='Create Category'
        btnTitle='Create'
      />
    </ModalContainer>
  );
}
