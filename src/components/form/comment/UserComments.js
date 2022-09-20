import React,{ useEffect, useState, useContext } from 'react'
import { Row, Col, Button, Input, List, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useAuth, useNotification } from '../../../hooks';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

export default function UserComments() {
    // States
    const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  // update
  const [selectedComment, setSelectedComment] = useState({});
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);

  const { updateNotification } = useNotification();

//   Context
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/user-comments`);
      //   console.log("__comments__", data);
      setComments(data);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    if (isLoggedIn?.token) {
      fetchComments();
    }
  }, [isLoggedIn?.token]);

//   Delete
const handleDelete = async (comment) => {
    try {
      const answer = window.confirm("Are you sure you want to delete?");
      if (!answer) return;

      const { data } = await axios.delete(`/comment/${comment._id}`);
      if (data?.ok) {
        setComments(comments.filter((c) => c._id !== comment._id));
        // setTotal(total - 1);
        updateNotification("success","Comment deleted successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

//   Submit
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/comment/${selectedComment._id}`, {
        content,
      });

      let arr = comments;
      const index = arr.findIndex((c) => c._id === selectedComment._id);
      arr[index].content = data.content;
      setComments(arr);

      setVisible(false);
      setLoading(false);
      setSelectedComment({});

      updateNotification("success","Comment updated");
    } catch (err) {
      console.log(err);
      setVisible(false);
    }
  };


// Filter Comments
const filteredComments = comments?.filter((comment) =>
comment.content.toLowerCase().includes(keyword)
);
  return (
    <>
        <Row>
        <Col span={24}>
          <h1 style={{ marginTop: 15 }}>{comments?.length} Comments</h1>

          <Input
            placeholder="Search"
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
          />

          <List
            itemLayout="horizontal"
            dataSource={filteredComments}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Link href={`/post/${item?.postId?.slug}#${item._id}`}>
                    <a>view</a>
                  </Link>,
                  <a
                    onClick={() => {
                      setSelectedComment(item);
                      setVisible(true);
                      setContent(item.content);
                    }}
                  >
                    edit
                  </a>,
                  <a onClick={() => handleDelete(item)}>delete</a>,
                ]}
              >
                <List.Item.Meta
                  description={`On ${item?.postId?.title} | ${
                    item?.postedBy?.name
                  } | ${dayjs(item.createdAt).format("L LT")}`}
                  title={item.content}
                />
              </List.Item>
            )}
          />
        </Col>
        </Row>

        <Row>
        <Col span={24}>
          <Modal
            visible={visible}
            title="Update comment"
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            footer={null}
          >
            <CommentForm
              handleSubmit={handleSubmit}
              comment={content}
              setComment={setContent}
              loading={loading}
            />
          </Modal>
        </Col>
      </Row>
    </>
  )
}
