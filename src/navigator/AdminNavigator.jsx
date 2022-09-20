import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Actors from "../components/admin/Actors";
import Categories from "../components/admin/categories/Categories";
// import Categories from "../components/admin/Categories";
// import Comments from "../components/admin/Comments";
import Dashboard from "../components/admin/Dashboard";
import Header from "../components/admin/Header";
import Movies from "../components/admin/Movies";
import MovieUpload from "../components/admin/MovieUpload";
import AdminNavbar from "../components/admin/nav/AdminNavbar";
import Posts from "../components/admin/Posts";
import PostUpload from "../components/admin/PostUpload";
import SearchMovies from "../components/admin/SearchMovies";
import ActorUpload from "../components/modals/ActorUpload";
import CategoryUpload from "../components/modals/CategoryUpload";
import NotFound from "../components/NotFound";

export default function AdminNavigator() {
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false);
  const [showActorUploadModal, setShowActorUploadModal] = useState(false);
  const [showCategoryUploadModal, setShowCategoryUploadModal] = useState(false);
  const [showPostUploadModal, setShowPostUploadModal] = useState(false);

  const displayMovieUploadModal = () => {
    setShowMovieUploadModal(true);
  };
  const hideMovieUploadModal = () => {
    setShowMovieUploadModal(false);
  };
  const displayActorUploadModal = () => {
    setShowActorUploadModal(true);
  };
  const hideActorUploadModal = () => {
    setShowActorUploadModal(false);
  };
  const displayCategoryUploadModal = () => {
    setShowCategoryUploadModal(true);
  };
  const hideCategoryUploadModal = () => {
    setShowCategoryUploadModal(false);
  };
  const displayPostUploadModal = () => {
    setShowPostUploadModal(true);
  };
  const hidePostUploadModal = () => {
    setShowPostUploadModal(false);
  };

  return (
    <>
      <div className='flex dark:bg-primary bg-white'>
        <AdminNavbar />
        <div className='flex-1 max-w-screen-xl'>
          <Header
            onAddMovieClick={displayMovieUploadModal}
            onAddActorClick={displayActorUploadModal}
            onAddCategoryClick={displayCategoryUploadModal}
            onAddPostClick={displayPostUploadModal}
          />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/admin/movies' element={<Movies />} />
            <Route path='/admin/actors' element={<Actors />} />
            <Route path='/admin/posts' element={<Posts />} />
            <Route path='/admin/categories' element={<Categories />} />
            {/* <Route path='/admin/comments' element={<Comments />} /> */}
            <Route path='/search' element={<SearchMovies />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <MovieUpload
        visible={showMovieUploadModal}
        onClose={hideMovieUploadModal}
      />
      <ActorUpload
        visible={showActorUploadModal}
        onClose={hideActorUploadModal}
      />
      <CategoryUpload
        visible={showCategoryUploadModal}
        onClose={hideCategoryUploadModal}
      />
      <PostUpload visible={showPostUploadModal} onClose={hidePostUploadModal} />
    </>
  );
}
