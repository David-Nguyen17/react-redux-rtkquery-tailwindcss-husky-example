import HomePage from "@/pages";
import NotFoundPage from "@/pages/404";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouteNames } from "./routesName";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path={RouteNames.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
