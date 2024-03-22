/* eslint-disable no-unused-vars */

import React, { useState, useRef, useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiCurrentLocation, BiImageAdd } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./style";
import Category from "./category";
import {
  handleChange,
  handleFileUpload,
  handleSubmit,
  initialText,
} from "./handlers";
import Sidebar from "../Sidebar/Sidebar";
import { useCustomState } from "../../configs/responsive";
import { Spinner } from "../Elements";
import { fetchEnd } from "../../Redux/postRedux";

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileInput = useRef(null);
  const [mobile] = useCustomState();
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [inputText, setInputText] = useState(initialText);
  const [categoryActive, setCategoryActive] = useState(false);

  const { result } = useSelector((state) => state.user?.currentUser);
  const {
    result: { picture },
  } = useSelector((state) => state.user?.currentUser);
  const posts = useSelector((state) => state.post?.posts);
  const cat = useSelector((state) => state.post?.categories);
  const editId = useSelector((state) => state.post?.currentId);
  const isFetching = useSelector((state) => state.post?.fetching);
  const post = editId ? posts.find((item) => item._id === editId) : null;
  const user = JSON.parse(localStorage.getItem("user"));
  const fullname = result.fullname || result.name;

  useEffect(() => {
    if (post) {
      setInputText({ title: post.title, context: post.context });
    }

    dispatch(fetchEnd());
  }, [post, dispatch]);

  return (
    <div className="flex relative">
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.header}>
          <BsArrowLeft
            fontSize={20}
            className="cursor-pointer"
            onClick={() => navigate("/posts")}
          />
          <p className="font-bold text-lg ">
            {mobile ? "Post" : "Create a new Post"}
          </p>
          <button
            type="button"
            className={styles.btn}
            onClick={(e) =>
              handleSubmit(
                e,
                selectedFiles,
                cat,
                editId,
                fullname,
                inputText,
                dispatch,
                setInputText,
                setSelectedFiles,
                navigate,
              )
            }
          >
            Post
          </button>
        </div>
        <div className={styles.profileCont}>
          <div className={styles.imgCont}>
            {picture ? (
              <img src={picture} alt="profile picture" className={styles.img} />
            ) : (
              <p className={styles.imgText}>{fullname?.charAt(0)}</p>
            )}
          </div>
          <div className="ml-2">
            <p className={styles.text}>
              {user?.result?.fullname || user?.result?.name}
            </p>
            <small className={styles.small}>
              <BiCurrentLocation className="mr-1" fontSize={20} />
              Add a Location
            </small>
          </div>
        </div>
        <div className={styles.space}>
          <input
            type="text"
            className={styles.input}
            placeholder="Title"
            onChange={(e) => handleChange(e, setInputText)}
            value={inputText?.title}
            name="title"
          />
          <textarea
            placeholder="Context"
            className={styles.textarea}
            onChange={(e) => handleChange(e, setInputText)}
            value={inputText?.context}
            name="context"
          />
        </div>
        <div className={styles.space}>
          <input
            type="file"
            multiple
            hidden
            ref={fileInput}
            onChange={(e) => handleFileUpload(e, setSelectedFiles)}
          />
          <div
            className={styles.iconWrapper}
            onClick={() => fileInput.current.click()}
          >
            <span className={styles.span}>
              <BiImageAdd fontSize={18} />
            </span>
            <p className="">Add an Image, GIF or Video</p>
          </div>
          <div
            className={`${styles.iconWrapper} mt-4`}
            onClick={() => setCategoryActive(true)}
          >
            <span className={styles.span}>
              <AiOutlinePlus fontSize={18} />
            </span>
            <p className="">Choose a category</p>
          </div>
        </div>
        {categoryActive && <Category setCategoryActive={setCategoryActive} />}
      </div>
      {isFetching && <Spinner />}
    </div>
  );
};

export default AddPost;
