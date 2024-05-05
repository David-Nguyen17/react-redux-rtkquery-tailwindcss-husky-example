import { RootState } from "@/redux/store";
import { UserInfo } from "@/services/auth/types";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_HOST,
  timeout: 1000 * 60,
  prepareHeaders: (headers, { getState }) => {
    const { access_token, user } = (getState() as RootState)["feature/auth"];
    if (access_token) {
      headers.set("x-token-id", `${access_token}`);
    }
    if (user?.id) {
      headers.set("x-client-id", `${user?.id}`);
    }
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);
  const { refresh_token, user } = (api.getState() as RootState)["feature/auth"];
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        method: "POST",
        url: "/refresh_token",
        body: { refresh_token, x_client_id: user?.id },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const { data } = refreshResult.data as {
        data: Pick<UserInfo, "tokens">;
      };
      //todo update new token
      data;
      result = await baseQuery(args, api, extraOptions);
    } else {
      //todo log out
    }
  }
  return result;
};
const AppSlice = createApi({
  reducerPath: "react_example",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    todo: builder.query({
      query: () => "todo",
    }),
  }),
});

export default AppSlice;
