import { IBodyLogin, ResponseUser, UserInfo } from "@/services/auth/types";
import { ErrorAuth } from "@/services/types";
import AppSlice from "..";

const AccessApi = AppSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<UserInfo, IBodyLogin>({
      query(arg) {
        return {
          url: "login",
          body: arg,
          method: "POST",
        };
      },
      transformResponse(response: ResponseUser) {
        if (response?.data?.data) {
          return {
            data: response.data?.data,
            tokens: response.data?.tokens,
          };
        }
        return {
          data: null,
          tokens: null,
        };
      },
      transformErrorResponse(response) {
        const { message } = response?.data as ErrorAuth;
        return message;
      },
    }),
  }),
});

export const { useLoginMutation } = AccessApi;
