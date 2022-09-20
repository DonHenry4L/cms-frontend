import React from "react";
import { Link } from "react-router-dom";
import { FiChevronsRight } from "react-icons/fi";
import { MdPhoneInTalk } from "react-icons/md";
import { BiEnvelope } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { BsGithub } from "react-icons/bs";
import "./contact.css";

export default function ContactScreen() {
  const getInputClasses = () => {
    return "bg-transparent border-b-[1px] border-b-gray-400 p-1 text-sm focus:outline-none focus:border-b-blue-500 text-white ";
  };
  const getLabelClasses = () => {
    return "text-base font-semibold text-gray-400 mb-2 ";
  };
  const getFormGroupClasses = () => {
    return "flex flex-col justify-center w-64 pr-10 even:pr-0 ";
  };
  const getSocialMediaClasses = () => {
    return "flex justify-center items-center h-8 w-8 rounded-full bg-blue-600 transition-all hover:bg-slate-800 cursor-pointer ";
  };

  return (
    <div>
      <section className='block z-10'>
        <div className='bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100 bg-cover text-white bg-hero-pattern h-96 bg-no-repeat bg-center'>
          <div className=' pl-4 pr-4'>
            <div className='flex justify-center pt-60'>
              <div className=''>
                <div className='text-center'>
                  <h2 className='text-xl font-extrabold text-[3rem] uppercase mb-4'>
                    get In touch
                  </h2>
                  <nav className='break-words text-center'>
                    <ol className='flex justify-center m-0 flex-wrap list-none space-x-1 md:space-x-3 blur-none'>
                      <li className='inline-flex items-center list-none'>
                        <Link
                          to='/'
                          className=' text-highlight dark:text-highlight-dark hover:text-gray-900 inline-flex items-center'
                        >
                          Home
                        </Link>
                      </li>
                      <li className='inline-flex items-center'>
                        <span className='float-left text-highlight dark:text-highlight-dark font-bold '>
                          <FiChevronsRight />
                        </span>
                      </li>
                      <li
                        aria-current='page'
                        className=' text-gray-500 inline-flex items-center'
                      >
                        Contact
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='contact__form pb-24 pt-24 flex flex-col justify-center items-center'>
        <div className='container  bg-transparent w-[1200px] rounded-xl p-3 overflow-hidden backdrop-filter border'>
          <div className='container__info flex justify-center flex-col flex-initial w-[50%] bg-blue-800 rounded-lg p-10 text-white'>
            <span className='text-highlight dark:text-highlight-dark font-bold'>
              Contact us
            </span>
            <h4 className=' mt-0 font-bold text-4xl uppercase mb-4'>
              HOW CAN I HELP YOU
            </h4>
            <p className=' text-base font-light mb-4'>
              Looking for inspiration for your Contact Us page?
            </p>
            <div className='icon-text flex flex-start items-center mb-4'>
              <MdPhoneInTalk className=' text-3xl mr-8' />
              <span className=' text-base font-light'>+(234) 806 574 4999</span>
            </div>
            <div className='icon-text flex flex-start items-center mb-4'>
              <BiEnvelope className=' text-3xl mr-8' />
              <span>9technetwork@gmail.com</span>
            </div>
            <ul>
              <div className='flex w-1/2 justify-between mt-40'>
                <li className={getSocialMediaClasses()}>
                  <FaFacebook className='h-6 w-6' />
                </li>
                <li className={getSocialMediaClasses()}>
                  <RiWhatsappFill className='h-6 w-6' />
                </li>
                <li className={getSocialMediaClasses()}>
                  <BsGithub className='h-6 w-6' />
                </li>
              </div>
            </ul>
          </div>
          {/* form */}
          <div>
            <div>
              <div>
                <div>
                  <form className='contact__form p-8 w-full'>
                    <div className='flex flex-initial w-full mb-8 form__box'>
                      <div className={getFormGroupClasses() + " input__box"}>
                        <label className={getLabelClasses()}>
                          <span className='text-red-600 text-xl'>*</span>Last
                          Name
                        </label>
                        <input
                          type='text'
                          className={getInputClasses() + " placeholder:italic"}
                          required
                          placeholder='Doe'
                        />
                      </div>
                      <div className={getFormGroupClasses() + " input__box"}>
                        <label className={getLabelClasses()}>
                          <span className='text-red-600 text-xl'>*</span>First
                          Name
                        </label>
                        <input
                          type='text'
                          className={getInputClasses() + " placeholder:italic"}
                          required
                          placeholder='John'
                        />
                      </div>
                      <div className='mt-[-40px]'></div>
                    </div>
                    <div className='flex flex-initial w-full form__box'>
                      <div className={getFormGroupClasses() + " input__box"}>
                        <label className={getLabelClasses()}>
                          <span className='text-red-600 text-xl'>*</span>Email
                        </label>
                        <input
                          type='email'
                          className={getInputClasses() + " placeholder:italic"}
                          required
                          placeholder='johndoe@gmail.com'
                        />
                      </div>
                      <div className={getFormGroupClasses() + " input__box"}>
                        <label className={getLabelClasses()}>
                          Phone Number
                        </label>
                        <input
                          type='tel'
                          className={getInputClasses() + " placeholder:italic"}
                          placeholder='mobile'
                        />
                      </div>
                    </div>
                    <div className='m-4'>
                      <label className='flex flex-col text-highlight dark:text-highlight-dark font-bold'>
                        What type of message are you sending?
                      </label>
                      <div className='flex justify-between'>
                        <div>
                          <input
                            id='radioEnquiry'
                            type='radio'
                            name='type'
                            value='Enquiry'
                            className='mr-4'
                          />
                          <label
                            for='radioEnquiry'
                            className='text-white font-semibold'
                          >
                            Enquiry
                          </label>
                        </div>
                        <div>
                          <input
                            id='radioComplaint'
                            type='radio'
                            name='type'
                            value='Complaint'
                            className='mr-4'
                          />
                          <label
                            for='radioComplaint'
                            className='text-white font-semibold'
                          >
                            Complaint
                          </label>
                        </div>

                        <div>
                          <input
                            id='radioSuggestion'
                            type='radio'
                            name='type'
                            value='Suggestion'
                            className='mr-4'
                          />
                          <label
                            for='radioSuggestion'
                            className='text-white font-semibold'
                          >
                            Suggestion
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className=''>
                      <div className='mt-10'>
                        <label className={getLabelClasses()}>
                          <span className='text-red-600 text-xl'>*</span>Message
                        </label>
                        <textarea
                          required
                          placeholder='Enquiry / Complaint / Suggestion'
                          className='h-24 w-full bg-transparent border-[1px] border-b-gray-400 p-1 text-sm focus:outline-none text-white resize-none rounded-md placeholder:italic '
                        />
                      </div>
                    </div>
                    <div className='mt-5 md:mt-4 -ml-7 flex-1 px-0 sm:px-4'>
                      <button
                        type='submit'
                        className='w-full mt-3 px-5 py-2 rounded-md text-white bg-blue-700 hover:bg-green-800 outline-none shadow-md focus:shadow-none focus:ring-2 ring-offset-2 ring-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto'
                      >
                        Submit Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* NewsLetter Area */}
      <section className='items-center mt-12 mx-2 sm:mx-8 max-w-screen-xl px-4px-4 gap-4 md:flex xl:px-8 xl:gap-12 bg-gradient-to-l from-yellow-500 to-blue-700 py-14 rounded-xl w-[1200px] '>
        <div className='flex-1 space-y-4 text-center md:text-left'>
          <h1 className='text-2xl text-gray-100 font-semibold lg:text-3xl'>
            Subscribe to our newsletter
          </h1>
          <p className='text-gray-200 leading-relaxed text-center text-sm md:text-justify md:pr-12'>
            We'll send you best of our blog just once a month. We promise.
          </p>
        </div>
        <div className='mt-5 md:mt-0 flex-1 px-0 sm:px-4'>
          <form className='items-center justify-center sm:flex'>
            <input
              type='email'
              placeholder='Enter e-mail'
              className='text-gray-500 w-full p-2 rounded-md border outline-none focus:border-green-800'
            />
            <button className='w-full mt-3 px-5 py-2 rounded-md text-white bg-blue-700 hover:bg-green-800 outline-none shadow-md focus:shadow-none focus:ring-2 ring-offset-2 ring-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto'>
              Subscribe
            </button>
          </form>
          <p className='mt-3 text-xs text-gray-200'>
            Post updates, announcements, and giveaways. Read our{" "}
            <Link to={"/"} class='text-gray-100 hover:text-gray-50 underline'>
              {" "}
              Privacy Policy{" "}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
