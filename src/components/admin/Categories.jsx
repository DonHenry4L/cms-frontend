import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { deleteCategory, getCategory } from "../../api/category";
import client from "../../api/client";
import { useNotification } from "../../hooks";
import ConfirmModal from "../modals/ConfirmModal";
import UpdateCategory from "../modals/UpdateCategory";

export default function Categories({ cate, afterDelete, afterUpdate }) {
  const [categories, setCategories] = useState([]);
  const [busy, setBusy] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const { updateNotification } = useNotification();
  const getCategories = async () => {
    try {
      const { data } = await client("/categories/get-categories");
      setCategories([...data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // const fetchCategories = async () => {
  //   const res = await getCategory();

  //   setCategory(res);
  // };

  const handleOnDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteCategory(selectedCategoryId?._id);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);

    // selectedCategoryId(null);
    hideConfirmModal();
  };

  const handleOnEditClick = () => {
    setShowUpdateModal(true);
    selectedCategoryId(categories);
  };

  const handleOnUpdate = (movie) => {
    afterUpdate(movie);
    setShowUpdateModal(false);
    setSelectedCategoryId(null);
  };

  const displayConfirmModal = () => setShowConfirmModal(true);
  const hideConfirmModal = () => setShowConfirmModal(false);

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  return (
    <div className='bg-white shadow dark:shadow dark:bg-secondary p-5 rounded pt-10'>
      <h1 className='font-semibold text-2xl mb-4 text-primary dark:text-white border-b text-center'>
        Categories
      </h1>
      <ul className='space-y-3'>
        {categories.map((c, index) => {
          return (
            <li key={index} className='mb-4'>
              <h1 className='dark:text-white text-secondary font-semibold dark:bg-slate-900 bg-slate-500 p-3 mb-2 h-14'>
                <p className=' font-extrabold text-xl'>{c.name}</p>

                <div className='flex justify-end space-x-3 items-center mb-2'>
                  <div className='p-2 space-x-5 absolute mb-7'>
                    <button
                      onClick={displayConfirmModal}
                      className='p-2 rounded-full bg-white text-primary hover:opacity-80 transition'
                      type='button'
                    >
                      <BsTrash />
                    </button>
                    <button
                      onClick={handleOnEditClick}
                      className='p-2 rounded-full bg-white text-primary hover:opacity-80 transition'
                      type='button'
                    >
                      <BsPencilSquare />
                    </button>
                  </div>
                  {/* <Options
                    category={category}
                    onDeleteClick={displayConfirmModal}
                    onEditClick={handleOnEditClick}
                  /> */}
                  <div className='p-0'>
                    <ConfirmModal
                      visible={showConfirmModal}
                      onConfirm={handleOnDeleteConfirm}
                      onCancel={hideConfirmModal}
                      title='Are you sure?'
                      subtitle='This action will remove this Category permanently!'
                      busy={busy}
                    />
                    <UpdateCategory
                      id={selectedCategoryId}
                      visible={showUpdateModal}
                      onSuccess={handleOnUpdate}
                    />
                  </div>
                </div>
              </h1>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const Options = ({ visible, onDeleteClick, onEditClick }) => {
  if (!visible) return null;

  return (
    <div className='absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm flex justify-center items-center space-x-5'>
      <button
        onClick={onDeleteClick}
        className='p-2 rounded-full bg-white text-primary hover:opacity-80 transition'
        type='button'
      >
        <BsTrash />
      </button>
      <button
        onClick={onEditClick}
        className='p-2 rounded-full bg-white text-primary hover:opacity-80 transition'
        type='button'
      >
        <BsPencilSquare />
      </button>
    </div>
  );
};

{
  /* <>
      <MovieCard
        movie={movie}
        onDeleteClick={displayConfirmModal}
        onEditClick={handleOnEditClick}
      />
      <div className='p-0'>
        <ConfirmModal
          visible={showConfirmModal}
          onConfirm={handleOnDeleteConfirm}
          onCancel={hideConfirmModal}
          title='Are you sure?'
          subtitle='This action will remove this movie permanently!'
          busy={busy}
        />
        <UpdateMovie
          movieId={selectedMovieId}
          visible={showUpdateModal}
          onSuccess={handleOnUpdate}
        />
      </div>
    </>
  );
};

const MovieCard = ({
  movie,
  visible,
  onDeleteClick,
  onEditClick,
  onOpenClick,
}) => {
  const { poster, title, responsivePosters, genres = [], status } = movie;
  return (
    <table className='w-full border-b'>
      <tbody>
        <tr>
          <td>
            <div className='w-24'>
              <img
                className='w-full aspect-video'
                src={getPoster(responsivePosters) || poster}
                alt={title}
              />
            </div>
          </td>
          <td className='w-full pl-5'>
            <div>
              <h1 className='text-lg font-semibold text-primary dark:text-white'>
                {title}
              </h1>
              <div className='space-x-1'>
                {genres.map((g, index) => {
                  return (
                    <span
                      key={g + index}
                      className='font-serif text-primary dark:text-white text-xs'
                      visible={visible}
                    >
                      {g}
                    </span>
                  );
                })}
              </div>
            </div>
          </td>
          <td className='px-5'>
            <p className='text-primary dark:text-white'>{status}</p>
          </td>

          <td>
            <div className='flex items-center space-x-3 text-primary dark:text-white text-lg'>
              <button onClick={onDeleteClick} type='button'>
                <BsTrash />
              </button>
              <button onClick={onEditClick} type='button'>
                <BsPencilSquare />
              </button>
              <button onClick={onOpenClick} type='button'>
                <BsBoxArrowRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}; */
}
