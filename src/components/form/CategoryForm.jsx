import { useEffect, useState } from "react";
import { GiOpenBook } from "react-icons/gi";
import { BsPlusCircleFill } from "react-icons/bs";
import { ImSpinner3 } from "react-icons/im";

export default function CategoryForm({
  title,
  initialState,
  busy,
  onSubmit,
  // category,
  btnTitle,
}) {
  const [name, setName] = useState("");

  const handleOnChange = ({ target }) => {
    setName(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryData = {
      name,
    };

    onSubmit(categoryData);
  };

  useEffect(() => {
    if (initialState) {
      setName(initialState.name);
    }
  }, [initialState]);

  return (
    <div className='dark:bg-primary bg-white p-3 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-[35rem] rounded'>
      <div className='max-w-md w-full space-y-8 '>
        <div>
          <GiOpenBook className='mx-auto h-12 w-auto text-blue-400' />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-sky-500'>
            {title}
          </h2>
        </div>
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          // category={category}
          className='dark:bg-primary bg-white p-3  rounded'
        >
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email-address' className='sr-only '>
                Name
              </label>
              {/* Title */}
              <input
                value={name}
                onChange={handleOnChange}
                type='text'
                autoComplete='text'
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm'
                placeholder='New Category'
              />
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              <button
                className='h-8  text-white dark:bg-indigo-800 dark:text-white hover:opacity-80 transition group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                type='submit'
              >
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <BsPlusCircleFill
                    className='h-5 w-5 text-green-200 group-hover:text-indigo-400'
                    aria-hidden='true'
                  />
                </span>
                {busy ? <ImSpinner3 className='animate-spin' /> : btnTitle}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
