import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";
import { deleteUser } from "../thunks/deleteUser";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: []
  },
  extraReducers(builder) {

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.data=action.payload;
    });

    builder.addCase(addUser.fulfilled,(state,action)=>{
      state.data.push(action.payload);
    });

    builder.addCase(deleteUser.fulfilled,(state,action)=>{
      state.data=state.data.filter((user)=>user.id!==action.payload.id);
    });
  },
});

export const usersReducer = usersSlice.reducer;
