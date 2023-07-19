import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        post: null,
        likedPost: [],
        currentId: null,
        categories: null,
        fetching: false,
        fetchError: false,
    },
    reducers: {
        fetchPosts: (state, action) => {
            state.posts = action.payload;
            state.fetching = false;
        }, 

        fetchPost: (state, action) => {
            state.post = action.payload;
            state.fetching = false;
        }, 

        fetchBySearch: (state, action) => {
            state.posts = action.payload;
        }, 

        createPost: (state, action) => {
            if(state.posts === undefined){
                state.posts = [];
            } else {
                state.posts.push(action.payload);
            }
        },

        editPost: (state, action) => {
            state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
        },

        removePost: (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload)
        },

        populateCategory: (state, action) => {
            state.categories = action.payload;
        },

        fetchStart: (state) => {
            state.fetching = true;
        },

        fetchEnd: (state) => {
            state.fetching = false;
        },

        setCurrentId: (state, action) => {
            state.currentId = action.payload;
        },

        removeCurrentId: (state) => {
            state.currentId = null;
        }

    }
})

export const { populateCategory, fetchStart, fetchEnd, fetchPosts, fetchPost, fetchBySearch, 
createPost, editPost, removePost, setCurrentId, removeCurrentId } = postSlice.actions;
export default postSlice.reducer;