import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_SERVER = "http://localhost:3001";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page = 1, order = "asc", limit = 10 }, { getState }) => {
    const response = await axios.get(
      `${URL_SERVER}/posts?_page=${page}&_limit=${limit}&_sort=id&_order=${order}`
    );
    const prevState = getState().posts;

    return {
      items: [...prevState.articles.items, ...response.data],
      page: page,
      end: response.data.length === 0 ? true : false,
    };
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id) => {
    const response = await axios.get(`${URL_SERVER}/posts/${id}`);
    return response.data;
  }
);

export const addToNewsletter = createAsyncThunk(
  "users/addToNewsletter",
  async (data) => {
    const findUser = await axios.get(
      `${URL_SERVER}/newsletter?email=${data.email}`
    );
    if (!Array.isArray(findUser.data) || !findUser.data.length) {
      const response = await axios.post(`${URL_SERVER}/newsletter`, {
        email: data.email,
      });
      return { newsletter: "added", email: response.data };
    }
    return { newsletter: "failed" };
  }
);

export const sendMessage = createAsyncThunk(
  "users/sendMessage",
  async (data) => {
    await axios.post(`${URL_SERVER}/contact`, data);
    return true;
  }
);
