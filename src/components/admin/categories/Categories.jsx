import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { deleteCategory } from "../../../api/category";
import client from "../../../api/client";
import { useNotification } from "../../../hooks";
import ConfirmModal from "../../modals/ConfirmModal";
import EditCategoryModal from "../../modals/EditCategoryModal";

export default function Categories({ afterUpdate }) {
  const [categories, setCategories] = useState([]);
  const [busy, setBusy] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [updatingCategory, setUpdatingCategory] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  // const [visible, setVisible] = useState(false)

  const { updateNotification } = useNotification();

  const getCategories = async () => {
    try {
      const { data } = await client("/category/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleOnDeleteConfirm = async (c) => {
    setBusy(true);
    const { error, message } = await deleteCategory(c._id);
    setCategories(categories.filter((cat) => cat.id !== c.id));
    setBusy(false);

    if (error) return updateNotification("error", error);
    updateNotification("success", message);

    const updatedCategories = categories.filter((cat) => cat._id !== c._id);

    setCategories([...updatedCategories]);

    const newCategory = categories.map((c) => {
      if (c._id === updatingCategory._id) return updatingCategory;
      return c;
    });
    setCategories([...newCategory]);

    // setCategories(data);
    hideConfirmModal();
  };

  const handleOnEditClick = (c) => {
    setUpdatingCategory(c);
    setShowEditModal(true);
  };

  // const handleOnUpdate = (c) => {
  //   const updatedCategory = {...updatingCategory, name:c.name}
  // };
  // setUpdatingCategory({...updatedCategory })

  const handleOnUpdate = () => {
    // afterUpdate(c);
    setShowEditModal(false);
    setUpdatingCategory(null);

    // const newCategories = categories.map((cat) => {
    //   if (cat._id === c._id) {
    //     return c;
    //   }
    //   return cat;
    // });
    // setCategories(newCategories);
    // setUpdatingCategory({});
    // console.log(c);
  };

  // confirm modals logic
  const displayConfirmModal = () => setShowConfirmModal(true);
  const hideConfirmModal = () => setShowConfirmModal(false);
  const hideEditModal = () => {
    setShowEditModal(false);
    setUpdatingCategory(null);
  };

  return (
    <>
      <div className='bg-white shadow dark:shadow dark:bg-secondary p-5 rounded pt-10'>
        <h1 className='font-semibold text-2xl mb-4 text-primary dark:text-white border-b text-center'>
          Categories
        </h1>
        <div className='space-y-2'>
          {categories.map((c) => {
            return (
              <div key={c._id} className=' font-bold text-xl'>
                <div className='dark:text-white text-secondary font-semibold dark:bg-slate-900 bg-slate-500 p-3 mb-2 h-14'>
                  <p className=' font-bold text-xl'>{c.name}</p>
                  {/* actions */}
                  <div className='flex justify-end space-x-4 -mt-6'>
                    <button
                      onClick={() => handleOnEditClick(c)}
                      className='btn btn-sm btn-outline-primary hover:opacity-80 transition'
                      type='button'
                    >
                      <BsPencilSquare />
                    </button>
                    <pre className='text-gray-600'>|</pre>
                    <button
                      onClick={displayConfirmModal}
                      className='btn btn-sm btn-outline-primary hover:opacity-80 transition'
                      type='button'
                    >
                      <BsTrash />
                    </button>
                    {/* confirm_modal */}
                    <div>
                      <ConfirmModal
                        visible={showConfirmModal}
                        onConfirm={() => handleOnDeleteConfirm(c)}
                        onCancel={hideConfirmModal}
                        title='Are you sure?'
                        subtitle='This action will remove this Category permanently!'
                        busy={busy}
                      />
                      <EditCategoryModal
                        visible={showEditModal}
                        initialState={updatingCategory}
                        onSuccess={handleOnUpdate}
                        onClose={hideEditModal}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
