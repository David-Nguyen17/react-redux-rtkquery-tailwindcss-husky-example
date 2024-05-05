import { User } from "@/types/access";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthProps {
  user: null | User;
  access_token: string | null;
  refresh_token: string | null;
}
const initialState: AuthProps = {
  user: null,
  access_token: null,
  refresh_token: null,
};
const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
});
export default AuthSlice;
