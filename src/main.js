import "./main.css";

import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { ViewContextProvider } from "./store/view-context";
import { MetaContextProvider } from "./store/meta-context";
import { ThemeProvider } from "@mui/material/styles";
import iiiTheme from "./themes/iiiTheme";

import App from "./App";

// document.addEventListener('DOMContentLoaded', () => {
const entry = document.querySelector("#root");
// render(<App />, entry);

render(
  <BrowserRouter basename={"/"}>
    <CookiesProvider>
      <ThemeProvider theme={iiiTheme}>
        <MetaContextProvider>
          <ViewContextProvider>
            <App />
          </ViewContextProvider>
        </MetaContextProvider>
      </ThemeProvider>
    </CookiesProvider>
  </BrowserRouter>,
  entry
);
// });
//
// (function($) {
//   $(document).ready(function(){
//     // Create a new instance of Headhesive
//     // var header = new Headhesive('header.header');
//     //
//     // $(document).on("click",".main-navigation li.avatar", (e)=>{
//     //   $(e.currentTarget).find(".member-menu").toggleClass("on");
//     // });
//     //
//     // $("body.home .slideshow").slick({
//     //   fade: true,
//     //   arrows: false,
//     //   infinite: true,
//     //   autoplay: true,
//     //   autoplaySpeed: 10000,
//     //   speed: 1000,
//     //   cssEase: 'linear'
//     // });
//
//
//
//  });
// }(jQuery));
