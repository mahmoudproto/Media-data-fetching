import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: []
  },
  extraReducers(builder) {

    // builder.addCase(fetchUsers.pending, (state, action) => {
    // });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.data=action.payload;
    });
    // builder.addCase(fetchUsers.rejected, (state, action) => {
    // });

    // builder.addCase(addUser.pending,(state,action)=>{
    // });
    builder.addCase(addUser.fulfilled,(state,action)=>{
      state.data.push(action.payload);
    });
    // builder.addCase(addUser.rejected,(state,action)=>{
    // });
  },
});

export const usersReducer = usersSlice.reducer;
