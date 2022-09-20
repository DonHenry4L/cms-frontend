import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getSingleMovie } from "../../api/movie";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import AddRatingModal from "../modals/AddRatingModal";
import ProfileModal from "../modals/ProfileModal";
import RatingStar from "../RatingStar";
import RelatedMovies from "../RelatedMovies";
import { getPoster } from "../../utils/helper";
import AppSearchForm from "../form/AppSearchForm";
import CommentForm from "../form/comment/CommentForm";
import axios from "axios";
import { Avatar, Card, List } from "antd";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const convertReviewCount = (count = 0) => {
  if (count <= 999) return count;

  return parseFloat(count / 1000).toFixed(2) + "k";
};

const convertDate = (date = "") => {
  return date.split("T")[0];
};

export default function SingleMovie({ post, movieComments }) {
  const [ready, setReady] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({});
  const [movie, setMovie] = useState({});

  const [comments, setComments] = useState(movieComments);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId);
    if (error) return updateNotification("error", error);

    setReady(true);
    setMovie(movie);
  };

  const handleOnRateMovie = () => {
    if (!isLoggedIn) return navigate("/auth/signin");
    setShowRatingModal(true);
  };

  const hideRatingModal = () => {
    setShowRatingModal(false);
  };

  // console.log(movie);

  const handleOnRatingSuccess = (reviews) => {
    setMovie({ ...movie, reviews: { ...reviews } });
  };

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
  };

  const hideProfileModal = () => {
    setShowProfileModal(false);
  };
  const handleSearchSubmit = (query) => {
    navigate("/movie/search?title=" + query);
  };

  useEffect(() => {
    if (movieId) fetchMovie();
  }, [movieId]);

  if (!ready)
    return (
      <div className='h-screen flex justify-center items-center dark:bg-primary bg-white'>
        <p className='text-light-subtle dark:text-dark-subtle animate-pulse'>
          Please wait...
        </p>
      </div>
    );

  const {
    id,
    trailer,
    poster,
    title,
    storyLine,
    type,
    language,
    releasedDate,
    responsivePosters,
    director = {},
    reviews = {},
    writers = [],
    cast = [],
    genres = [],
  } = movie;


  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/comment/${movie._id}`, { comment });
      setComments([data, ...comments]);
      setComment("");
      updateNotification("success","Comment posted successfully");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className='dark:bg-primary bg-white min-h-screen pb-10 pt-20'>
      <div className='pt-12 '>
        <AppSearchForm
          placeholder='Search...'
          inputClassName=' relative flex-auto min-w-0 block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none hover:bg-slate-500 '
          onSubmit={handleSearchSubmit}
        />
      </div>
      <Container className='xl:px-0 px-2'>
        <div className='flex justify-between bg-single-background backdrop-blur-md'>
          <img
            className='aspect-video w-80 h-[30rem]  blur-none m-5 object-center'
            src={getPoster(responsivePosters) || poster}
            alt={title}
          />
          <h1 className='mt-44 flex flex-shrink flex-wrap xl:text-7xl lg:text-6xl text-4xl text-red-700 dark:text-highlight-dark font-semibold py-3 blur-sm'>
            {title}
          </h1>
          <div className='flex justify-end mr-5 mt-10'>
            <video
              poster={poster}
              controls
              src={trailer}
              className=' w-80 h-80'
            ></video>
          </div>
        </div>
        <div className=' bg-single-rgb w-full bg-single-color h-10 blur-sm' />
        <div className='flex justify-between'>
          <h1 className='xl:text-6xl lg:text-3xl text-2xl text-highlight dark:text-highlight-dark font-semibold py-3'>
            {title}
          </h1>
          <div className='flex flex-col items-end'>
            <RatingStar rating={reviews.ratingAvg} />
            <CustomButtonLink
              label={convertReviewCount(reviews.reviewCount) + " Reviews"}
              onClick={() => navigate("/movie/reviews/" + id)}
            />
            <CustomButtonLink label='Rate Movie' onClick={handleOnRateMovie} />
          </div>
        </div>

        <ListWithLabel label='Genre:'>
          {genres.map((g) => (
            <div
              key={g}
              className='w-full mt-3 px-2 py-2 rounded-md ring-offset-2 dark:bg-slate-600 bg-slate-300 shadow-md outline-none sm:mt-0 sm:ml-3 sm:w-auto'
            >
              <CustomButtonLink label={g} clickable={false} />
            </div>
          ))}
        </ListWithLabel>
        <div className='space-y-3 mt-10'>
          {/* <h2 className='text-light-subtle dark:text-dark-subtle font-semibold'>
            StoryLine:
          </h2> */}
          <p className='text-black dark:text-dark-subtle bg-slate-500 m-5'>
            <span className='p-5 flex'>{storyLine}</span>
          </p>
          <ListWithLabel label='Director:'>
            <CustomButtonLink
              label={director.name}
              onClick={() => handleProfileClick(director)}
            />
          </ListWithLabel>
          <ListWithLabel label='Writer(s):'>
            {writers.map((w) => (
              <CustomButtonLink
                key={w.id}
                label={w.name}
                onClick={() => handleProfileClick(w)}
              />
            ))}
          </ListWithLabel>
          <ListWithLabel label='LeadActor(s):'>
            {cast.map(({ id, profile, leadActor }) => {
              return leadActor ? (
                <CustomButtonLink
                  label={profile.name}
                  key={id}
                  onClick={() => handleProfileClick(profile)}
                />
              ) : null;
            })}
          </ListWithLabel>

          <CastProfiles cast={cast} />
          <RelatedMovies movieId={movieId} />
          <ListWithLabel>
            <CustomButtonLink label={type} clickable={false} />
          </ListWithLabel>
          <ListWithLabel label='Release Date:'>
            <CustomButtonLink
              label={convertDate(releasedDate)}
              clickable={false}
            />
          </ListWithLabel>
          <ListWithLabel label='Language:'>
            <CustomButtonLink label={language} clickable={false} />
          </ListWithLabel>
        </div>
      </Container>

      <Card>
      <CommentForm
              comment={comment}
              setComment={setComment}
              handleSubmit={handleSubmit}
              loading={loading}
            />

            <div style={{ marginBottom: 50 }}></div>

            <List
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={(item) => (
                <List.Item key={item._id} id={item._id}>
                  <List.Item.Meta
                    avatar={<Avatar>{item?.postedBy?.name?.charAt(0)}</Avatar>}
                    title={item?.postedBy?.name}
                    description={`${item.content} - ${dayjs().fromNow()}`}
                  />
                </List.Item>
              )}
            />
      </Card>
      <ProfileModal
        visible={showProfileModal}
        onClose={hideProfileModal}
        profileId={selectedProfile.id}
      />

      <AddRatingModal
        visible={showRatingModal}
        onClose={hideRatingModal}
        onSuccess={handleOnRatingSuccess}
      />
    </div>
  );
}

const ListWithLabel = ({ children, label }) => {
  return (
    <div className='flex space-x-2'>
      <p className='text-light-subtle dark:text-dark-subtle font-semibold'>
        {label}
      </p>
      {children}
    </div>
  );
};

const CastProfiles = ({ cast }) => {
  const [selectedProfile, setSelectedProfile] = useState({});
  const [showProfileModal, setShowProfileModal] = useState(false);

  const hideProfileModal = () => {
    setShowProfileModal(false);
  };

  const onProfileClick = (profile) => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
  };
  return (
    <div className=''>
      <div className='flex flex-wrap space-x-4'>
        {cast.map(({ id, profile, roleAs }) => {
          return (
            <div
              key={id}
              className='basis-28 flex flex-col items-center text-center mb-4'
            >
              <img
                className='w-24 h-24 aspect-square object-cover rounded-full'
                src={profile.avatar}
                alt=''
              />
              <ProfileModal
                visible={showProfileModal}
                onClose={hideProfileModal}
                profileId={selectedProfile.id}
              />

              <CustomButtonLink
                label={profile.name}
                onClick={() => onProfileClick(profile)}
              />
              <span className='text-light-subtle dark:text-dark-subtle text-sm'>
                as
              </span>
              <p className='text-light-subtle dark:text-dark-subtle'>
                {roleAs}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
