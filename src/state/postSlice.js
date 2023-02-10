import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { records: [], post: {}, loading: false, error: null };
export const fetchPosts = createAsyncThunk(
	"posts/fetchPosts",
	async (_, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const res = await fetch("http://localhost:5000/posts");
			const data = await res.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

export const deletePost = createAsyncThunk(
	"posts/deletePost",
	async (id, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const res = await fetch(`http://localhost:5000/posts/${id}`, {
				method: "DELETE",
			});
			return id;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);
export const InsertPost = createAsyncThunk(
	"posts/InsertPost",
	async (item, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const res = await fetch(`http://localhost:5000/posts`, {
				method: "POST",
				body: JSON.stringify(item),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			});
			const data = await res.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);
export const GetByIdPost = createAsyncThunk(
	"posts/GetByIdPost",
	async (id, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const res = await fetch(`http://localhost:5000/posts/${id}`, {
				method: "GET",
			});
			return res.json();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);
export const updatePost = createAsyncThunk(
	"posts/updatePost",
	async (item, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const res = await fetch(`http://localhost:5000/posts/${item.id}`, {
				method: "PATCH",
				body: JSON.stringify(item),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			});
			const data = await res.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

const postSlice = createSlice({
	name: "posts",
	initialState,
	//for handling syncronous update
	reducers: {},
	//for handling asyncronous update
	extraReducers: {
		//fetch posts
		[fetchPosts.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.records = action.payload;
			state.loading = false;
		},
		[fetchPosts.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		//delete post
		[deletePost.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[deletePost.fulfilled]: (state, action) => {
			state.records = state.records.filter((elem) => elem.id != action.payload);
			state.loading = false;
		},
		[deletePost.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
		//add post
		[InsertPost.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[InsertPost.fulfilled]: (state, action) => {
			state.records = [...state.records, action.payload];
			state.loading = false;
		},
		[InsertPost.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
		//edit post
		[GetByIdPost.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[InsertPost.fulfilled]: (state, action) => {
			state.post = action.payload;
			state.loading = false;
		},
		[InsertPost.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
		//edit post
		[GetByIdPost.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[GetByIdPost.fulfilled]: (state, action) => {
			state.post = action.payload;
			state.loading = false;
		},
		[GetByIdPost.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
		[updatePost.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[updatePost.fulfilled]: (state, action) => {
			const updatedPostIndex = state.records.findIndex(
				(elem) => elem.id === action.payload.id,
			);
			state.records[updatedPostIndex] = action.payload;
			state.loading = false;
		},
		[updatePost.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
	},
});

export default postSlice.reducer;
