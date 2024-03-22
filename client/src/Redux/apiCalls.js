/* eslint-disable no-unused-vars */

import { publicRequest, privateRequest } from "../axiosSetup";
import {
  loginStart,
  loginFailure,
  loginSuccess,
  setErrorMsg,
  setSuccessMsg,
} from "./userRedux";
import {
  fetchPosts,
  fetchPost,
  fetchBySearch,
  createPost,
  editPost,
  removePost,
  fetchStart,
  fetchEnd,
} from "./postRedux";

export const auth = async (dispatch, form, signup, navigate) => {
  console.log(form);
  dispatch(loginStart());
  try {
    const { data } = await publicRequest.post(
      `${signup ? "/users" : "/login"}`,
      form
    );

    if (data) {
      if (data.type === "signup" || signup) {
        dispatch(setSuccessMsg("successful, login now!"));
        return navigate("/auth");
      } else {
        dispatch(loginSuccess(data));
        dispatch(setSuccessMsg("login successful!"));
        return navigate("/posts");
      }
    }
  } catch (error) {
    console.log(error);
    dispatch(loginFailure(error.response.data.message));
    dispatch(
      setErrorMsg(
        error.response.data.message ||
          error.response.data.error ||
          error.response.data
      )
    );
  }
};

export const fetchAllPosts = async (dispatch) => {
  try {
    const { data } = await privateRequest.get("/posts");

    dispatch(fetchPosts(data.posts));
  } catch (error) {
    console.log(error);
    dispatch(
      setErrorMsg(
        error.response.data.message ||
          error.response.data.error ||
          error.response.data
      )
    );
  }
};

export const fetchPeople = async () => {
  try {
    const { data } = await publicRequest.get("/users");

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMessages = async () => {
  try {
    const { data } = await publicRequest.get("/messages");

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAPost = async (dispatch, id) => {
  dispatch(fetchStart);
  try {
    const { data } = await privateRequest.get(`/posts/${id}`);

    await dispatch(fetchPost(data));
    dispatch(fetchEnd);
  } catch (error) {
    console.log(error);
    dispatch(
      setErrorMsg(
        error.response.data.message ||
          error.response.data.error ||
          error.response.data
      )
    );
  }
};

export const fetchPostsBySearch = async (dispatch, query) => {
  dispatch(fetchStart());
  try {
    const { data } = await privateRequest.post(`/posts/search?query=${query}`);

    await dispatch(fetchBySearch(data));
    dispatch(fetchEnd());
  } catch (error) {
    console.log(error);
    dispatch(
      setErrorMsg(
        error.response.data.message ||
          error.response.data.error ||
          error.response.data
      )
    );
  }
};

export const savePost = async (dispatch, post, navigate) => {
  try {
    const { data } = await privateRequest.post("/posts", post);

    dispatch(createPost(data));
    navigate("/posts");
  } catch (error) {
    console.log(error);
    dispatch(
      setErrorMsg(
        error.response.data.message ||
          error.response.data.error ||
          error.response.data
      )
    );
  }
};

export const updatePost = async (dispatch, postToUpdate, navigate, id) => {
  dispatch(fetchStart());
  try {
    const { data } = await privateRequest.patch(`/posts/${id}`, postToUpdate);

    await dispatch(editPost(data));
    dispatch(fetchEnd());

    navigate("/posts");
  } catch (error) {
    console.log(error);
    dispatch(
      setErrorMsg(
        error.response.data.message ||
          error.response.data.error ||
          error.response.data
      )
    );
  }
};

export const deletePost = async (dispatch, id) => {
  try {
    await privateRequest.delete(`/posts/${id}`);

    dispatch(removePost(id));
  } catch (error) {
    console.log(error);
    dispatch(
      setErrorMsg(
        error.response.data.message ||
          error.response.data.error ||
          error.response.data
      )
    );
  }
};

export const fetchLike = async (dispatch, id) => {
  try {
    const { data } = await privateRequest.post(`/posts/likePost/${id}`);

    dispatch(editPost(data));
  } catch (error) {
    console.log(error);
    dispatch(
      setErrorMsg(
        error.response.data.message ||
          error.response.data.error ||
          error.response.data
      )
    );
  }
};

export const fetchComments = async (dispatch, comment, id) => {
  try {
    const { data } = await privateRequest.post(
      `/posts/commentPost/${id}`,
      comment
    );

    await dispatch(editPost(data));
    return data?.comments;
  } catch (error) {
    console.log(error);
    dispatch(
      setErrorMsg(
        error.response.data.message ||
          error.response.data.error ||
          error.response.data
      )
    );
  }
};
