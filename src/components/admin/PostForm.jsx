import React, { useEffect, useState } from "react";
import { commonInputClasses } from "../../utils/theme";
import CKEditor from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import Editor from 'ckeditor5-custom-build/build/ckeditor';
import MDEditor from "@uiw/react-md-editor";
import Label from "../Label";
import { Select, Modal, Button } from "antd";
import PosterSelector from "../PosterSelector";
import client from "../../api/client";
import "./css/postForm.css";
import { postValidator } from "../../utils/validator";
import { useNotification } from "../../hooks";
import Submit from "../form/Submit";

// CKEditor Config
const editorConfiguration = {
  toolbar: {
    items: [
      "heading",
      "|",
      "fontSize",
      "|",
      "fontFamily",
      "|",
      "bold",
      "italic",
      "|",
      "alignment",
      "|",
      "numberedList",
      "bulletedList",
      "|",
      "indent",
      "outdent",
      "|",
      "link",
      "ckfinder",
      "blockQuote",
      "imageUpload",
      "imageTextAlternative",
      "imageStyle:full",
      "imageStyle:side",
      "insertTable",
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "mediaEmbed",
      "|",
      "undo",
      "redo",
      "placeholder",
    ],
  },
  // image: {
  //   toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
  // },
  // table: {
  //   contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  // },
  placeholderConfig: {
    type: ["Name", "DOB"],
  },
};

const { Option } = Select;

const defaultPostInfo = {
  title: "",
  content: "",
  categories: [],
  poster: null,
};

export default function PostForm({ onSubmit, btnTitle, initialState, busy }) {
  // const savedTitle = () => {
  //   if (process.browser) {
  //     if (localStorage.getItem("post-title")) {
  //       return JSON.parse(localStorage.getItem("post-title"));
  //     }
  //   }
  // };
  // const savedContent = () => {
  //   if (process.browser) {
  //     if (localStorage.getItem("post-content")) {
  //       return JSON.parse(localStorage.getItem("post-content"));
  //     }
  //   }
  // };

  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  const [postInfo, setPostInfo] = useState({ ...defaultPostInfo });
  // const [value, setValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState("");
  const [visible, setVisible] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const { error } = postValidator(postInfo);
    // if (error) updateNotification("error", error);
    // try {
    //   const { data } = await client.post("/post/create", {
    //     title,
    //     content,
    //     categories,
    //   });
    //   if (data?.error) return updateNotification("error", data?.error);
    //   updateNotification("success", "Post uploaded successfully.");
    // } catch (error) {
    //   console.log(error);
    //   if (error) return updateNotification("error", error);
    // }
    const { poster } = postInfo;

    const formData = new FormData();
    const finalPostInfo = {
      ...postInfo,
    };

    if (poster) finalPostInfo.poster = poster;

    for (let key in finalPostInfo) {
      formData.append(key, finalPostInfo[key]);
    }

    onSubmit(formData);
    console.log(categories);
  };

  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedPosterForUI(url);
  };

  const handleChange = ({ target }) => {
    const { value, name, files } = target;
    if (name === "poster") {
      const poster = files[0];
      updatePosterForUI(poster);
      return setPostInfo({ ...postInfo, poster });
    }

    setPostInfo({ ...postInfo, [name]: value });
  };

  const loadCategories = async () => {
    try {
      const { data } = await client("/category/categories");
      setLoadedCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (initialState) {
      setPostInfo({
        ...initialState,
        poster: null,
      });
      setSelectedPosterForUI(initialState.poster);
    }
  }, [initialState]);

  const { title, content } = postInfo;
  // console.log(category);

  return (
    <>
      <div className='flex space-x-3'>
        <div className='w-[70%] space-y-5 mr-10 '>
          <div className='mb-6'>
            <h1 className='text-white mt-10 font-semibold text-lg ml-6 flex'>
              Add New Post
            </h1>
          </div>

          <div data-color-mode='dart' className='ml-4 sm:w-full'>
            <div>
              <Label>Title</Label>
              <input
                className={
                  commonInputClasses +
                  " border-b-2 font-semibold text-xl bg-slate-900 mb-2 rounded-md placeholder:text-gray-600 placeholder:p-2 "
                }
                placeholder='Give your post title...'
                type='text'
                htmlFor='title'
                value={title}
                name='title'
                id='title'
                onChange={handleChange}
              />
            </div>
            <div>
              <textarea
                // disabled={true}
                // editor={ClassicEditor}
                defaultValue={content}
                name='content'
                id='content'
                config={editorConfiguration}
                onChange={handleChange}
              ></textarea>
              <br />
              <br />
              {/* <MDEditor.Markdown
                source={content}
                style={{ whiteSpace: "pre-wrap" }}
              /> */}
            </div>
          </div>

          <Submit
            busy={busy}
            value={btnTitle}
            onClick={handleSubmit}
            type='button'
          />
        </div>

        {/* side bar */}
        <div className=' w-[30%] space-y-5'>
          <Button
            onClick={() => setVisible(true)}
            className='bg-slate-700 mt-3 mr-0 mb-3 ml-0 w-full text-white'
          >
            Preview
          </Button>

          <PosterSelector
            onChange={handleChange}
            selectedPoster={selectedPosterForUI}
            name='poster'
            accept='image/jpg, image/jpeg, image/png'
            label='Select poster'
          />
          <div className=''>
            <h4 className='text-white font-bold'>Categories</h4>
            <Select
              mode='multiple'
              allowClear={true}
              className='w-full'
              placeholder='Select Categories'
              onChange={(v) => setCategories(v)}
              optionFilterProp='children'
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {loadedCategories.map((item) => (
                <Option key={item.name}>{item.name}</Option>
              ))}
            </Select>
          </div>
        </div>

        <Modal
          title='Preview'
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={720}
          footer={null}
        >
          <h1>{title}</h1>
          <MDEditor defaultValue={content} readOnly={true} />
        </Modal>
      </div>
    </>
  );
}
