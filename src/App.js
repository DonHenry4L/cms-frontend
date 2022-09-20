import { Route, Routes } from "react-router-dom";
import "./App.css";
import ConfirmPassword from "./components/auth/ConfirmPassword";
import EmailVerification from "./components/auth/EmailVerification";
import ForgetPassword from "./components/auth/ForgetPassword";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";

import Home from "./components/Home";
import NotFound from "./components/NotFound";
import ContactScreen from "./components/screens/ContactScreen";
import MovieReviews from "./components/user/MovieReviews";
import Navbar from "./components/user/Navbar";
import SearchMovies from "./components/user/SearchMovies";
import Series from "./components/user/Series";
import SingleMovie from "./components/user/SingleMovie";
import { useAuth } from "./hooks";
import AdminNavigator from "./navigator/AdminNavigator";
// import AuthorNavigator from "./navigator/AuthorNavigator";
// dispatcher

function App() {
  const { authInfo } = useAuth();
  const isAdmin = authInfo.profile?.role === "admin";
  // const isAuthor = authInfo.profile?.role === "author";

  if (isAdmin) {
    return <AdminNavigator />;
  } else
    return (
      <>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth/signin' element={<Signin />} />
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/verification' element={<EmailVerification />} />
          <Route path='/auth/forget-password' element={<ForgetPassword />} />
          <Route path='/auth/reset-password' element={<ConfirmPassword />} />
          <Route path='/movie/:movieId' element={<SingleMovie />} />
          <Route path='/movie/reviews/:movieId' element={<MovieReviews />} />
          <Route path='/movie/search' element={<SearchMovies />} />
          <Route path='/@your-service/contact-us' element={<ContactScreen />} />
          <Route path='/series' element={<Series />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </>
    );
}

export default App;
