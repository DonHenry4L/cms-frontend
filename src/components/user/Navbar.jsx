import React, { useEffect, useState } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useTheme } from "../../hooks";
import AdminNavigator from "../../navigator/AdminNavigator";
// import AuthorNavigator from "../../navigator/AuthorNavigator";
import UserNavigator from "../../navigator/UserNavigator";
import Container from "../Container";
// import AppSearchForm from "../form/AppSearchForm";
import "./Navbar.css";

export default function Navbar() {
  const { toggleTheme } = useTheme();
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;
  // console.log(authInfo);

  const [show, handleShow] = useState(false);

  // const navigate = useNavigate();

  // const handleSearchSubmit = (query) => {
  //   navigate("/movie/search?title=" + query);
  // };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  const roleBasedLink = () => {
    const isAdmin = authInfo.profile?.role === "admin";
    // const isAuthor = authInfo.profile?.role === "author";

    if (isAdmin) {
      return <AdminNavigator />;
    } else return <UserNavigator />;
  };

  return (
    // className='bg-secondary shadow-sm shadow-gray-500'
    <div className='mb-12'>
      <div className={`nav ${show && "nav__black"}`}>
        <Container className='p-2'>
          <div className='flex justify-between items-center'>
            <Link to='/'>
              <img src='./logo192.png' alt='' className='sm:h-10 h-8' />
            </Link>

            <ul className='flex items-center sm:space-x-4 space-x-2'>
              <div className='relative group'>
                <button
                  className='flex flex-row items-center w-full mt-2 text-base font-bold text-center uppercase bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 focus:outline-none font-montserrat text-highlight dark:text-highlight-dark'
                  style={{ marginLeft: "auto" }}
                >
                  <span className='flex items-end justify-end  hover:font-semibold'>
                    {authInfo?.profile?.name || "DashBoard"}
                  </span>
                </button>
                <div className='absolute z-10 hidden bg-grey-200 group-hover:block border-t-blue-900 border-t-3 space-x-2'>
                  <div className='pt-2 pb-4 bg-gray-900 shadow-lg dark:border-dark-subtle border-light-subtle dark:text-dark-subtle text-white hover:opacity-80 transition duration-700 ease-in-out font-semibold border-2 rounded text-lg px-3 py-1 w-32 '>
                    <div
                      disabled
                      className='grid grid-cols-1 gap-4 md:grid-cols-2'
                    >
                      <p className='text-gray-600'>Management</p>
                    </div>
                    <Link to={roleBasedLink()}>
                      <span className='grid grid-cols-1 gap-4 md:grid-cols-2 hover:text-blue-300 cursor-pointer ml-5'>
                        {" "}
                        {/* if === Admin(return admin route) elseif === Author(return author route) else return user route */}
                        <p className='hover:bg-blue-900 text-white dark:hover:bg-blue-700 dark:text-gray-400 h-fit  w-fit'>
                          Dashboard
                        </p>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <li>
                {isLoggedIn ? (
                  <Link
                    to='/'
                    onClick={handleLogout}
                    className='text-blue-500 font-semibold text-lg dark:text-blue-400'
                  >
                    LogOut
                  </Link>
                ) : (
                  <Link
                    className='text-blue-500 dark:text-blue-400 font-semibold text-lg'
                    to='/auth/signin'
                  >
                    Login
                  </Link>
                )}
              </li>
              <li>
                <button
                  onClick={toggleTheme}
                  className='dark:bg-blue-500 bg-dark-subtle p-1 rounded sm:text-2xl text-lg'
                >
                  <BsFillSunFill className='text-secondary' size={15} />
                </button>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </div>
  );
}
