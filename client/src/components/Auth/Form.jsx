/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormData from "./FormData";
import {
  initialForm,
  errorInitialState,
  googleDispatch,
  googleFailure,
} from "./utils";
import { auth } from "../../Redux/apiCalls";
import { loginFailure } from "../../Redux/userRedux";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchError = useSelector((state) => state.user.error);
  const { isFetching } = useSelector((state) => state.user);

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState(errorInitialState);
  const [isRequesting, setIsRequesting] = useState(false);

  const isFieldEmpty = isSignUp
    ? formData.fullname === "" ||
      formData.email === "" ||
      formData.confirmPassword === "" ||
      formData.password === ""
    : formData.email === "" || formData.password === "";

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(loginFailure(false));
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch, fetchError]);

  const checkValidation = async () => {
    if (isFieldEmpty) {
      setError({ ...errorInitialState, emptyField: true });
      setTimeout(() => {
        setError(errorInitialState);
      }, 3000);
      return "error";
    }

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setError({ ...errorInitialState, passwordMismatch: true });
        setTimeout(() => {
          setError(errorInitialState);
        }, 3000);
        return "error";
      }
    }

    if (formData.password.length < 8) {
      setError({ ...errorInitialState, shortPassword: true });
      setTimeout(() => {
        setError(errorInitialState);
      }, 3000);
      return "error";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRequesting) return;
    setIsRequesting(true);

    const data = isSignUp
      ? formData
      : { email: formData.email, password: formData.password };

    const error = await checkValidation();
    if (error) {
      return;
    }

    await auth(dispatch, data, isSignUp, navigate, isFetching);
    setIsRequesting(false);
    setError(errorInitialState);
    setFormData(initialForm);
  };

  const login = useGoogleLogin({
    onSuccess: googleDispatch(dispatch),
    onError: googleFailure,
  });

  return (
    <FormData
      isSignUp={isSignUp}
      setIsSignUp={setIsSignUp}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleClick={handleClick}
      showPassword={showPassword}
      error={error}
      fetchError={fetchError}
      login={login}
      isFetching={isFetching}
      isRequesting={isRequesting}
    />
  );
};

export default Form;
