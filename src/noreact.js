import "./main.css";

import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import SidebarNavigation from "./components/layout/SidebarNavigation";
import Footer from "./components/layout/Footer";
import SignupForm from "./components/layout/SignupForm";
import Overlay from "./components/layout/Overlay";

import { MetaContextProvider } from "./store/meta-context";
import { ThemeProvider } from '@mui/material/styles';
import iiiTheme from "./themes/iiiTheme";
const entryHeader = document.querySelector("#react-header");
const entrySidemenu = document.querySelector("#react-sidemenu");
const entryFooter = document.querySelector("#react-footer");


render(
  <BrowserRouter basename={"/"}>
    <ThemeProvider theme={iiiTheme}>
      <MetaContextProvider>
        <Navigation noreactrouter />
      </MetaContextProvider>
    </ThemeProvider>
  </BrowserRouter>,
  entryHeader
);

render(
  <BrowserRouter basename={"/"}>
    {/* <ThemeProvider theme={iiiTheme}> */}
      {/* <MetaContextProvider> */}
        <SidebarNavigation noreactrouter />
      {/* </MetaContextProvider> */}
    {/* </ThemeProvider> */}
  </BrowserRouter>
  ,
  entrySidemenu
);

render(
  // <BrowserRouter basename={"/"}>
    <ThemeProvider theme={iiiTheme}>
        <div className="p-8 lg:p-24 bg-bg-light-gray">
          <h4 className="text-lg lg:text-2xl mb-4 lg:mb-10 max-w-xs">
            stay updated,
            <br />
            subscribe to our newsletter
          </h4>
          <SignupForm />
        </div>
        <Footer />
        <Overlay />
    </ThemeProvider>
  // </BrowserRouter>
  ,
  entryFooter
);
