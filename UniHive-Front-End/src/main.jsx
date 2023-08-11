import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from './Themes/theme.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import LandingPage from "./layouts/LandingPage";
import MainPageLayout from "./layouts/MainPageLayout";
import RootLayout  from "./layouts/RootLayout";
//import {dataLoader as HiveLoader }  from "./components/ClippedDrawer";
//import {userLoader} from "./components/StartBuzz";
//import {postLoader} from "./components/Post";

//Paths 
/*
const router = createBrowserRouter([ 
  {
    path: "/",
    element: <LandingPage />,

},{
  path: "main",
  element: <MainPageLayout />,}

]);


*/




//Constructs the router

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<RootLayout/>}>
        <Route path="/" element={<LandingPage/>}></Route>
      <Route path="main" element={<MainPageLayout/>}  ></Route>
     
    </Route>
  )
);













ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
    </ThemeProvider>
    </React.StrictMode>,
)
