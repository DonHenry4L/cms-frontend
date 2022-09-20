import React, { useState } from "react";
import { uploadPost } from "../../api/post";
import { useNotification } from "../../hooks";
import ModalContainer from "../modals/ModalContainer";
import PostForm from "./PostForm";

export default function PostUpload({ visible, onClose, categories }) {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoInfo, setVideoInfo] = useState({});
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const resetState = () => {
    setVideoSelected(false);
    setVideoUploaded(false);
    setUploadProgress(0);
    setVideoInfo({});
  };

  const handleTypeError = (error) => {
    updateNotification("error", error);
  };

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error } = await uploadPost(data, categories);
    setBusy(false);

    if (error) return updateNotification("error", error);

    updateNotification("success", "Post uploaded successfully.");
    resetState();
    onClose();
  };

  return (
    <ModalContainer visible={visible}>
      <PostForm
        btnTitle='Upload'
        busy={busy}
        onSubmit={!busy ? handleSubmit : null}
        categories={categories}
      />
    </ModalContainer>
  );
}
