import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Themes/theme.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import LandingPage from "./layouts/LandingPage";
import MainPageLayout from "./layouts/MainPageLayout";
import RootLayout from "./layouts/RootLayout";
import { Provider } from "react-redux";
import store from "../redux/store";
import EventPageLayout from "./layouts/EventPageLayout";
import VideoPageLayout from "./layouts/VideoPageLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<RootLayout />}>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="main" element={<MainPageLayout />}></Route>
      <Route path="event" element={<EventPageLayout />}></Route>
      <Route path="video" element={<VideoPageLayout />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
