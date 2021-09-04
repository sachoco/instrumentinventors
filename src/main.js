import "./main.css";

import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ViewContextProvider } from "./store/view-context";

// document.addEventListener('DOMContentLoaded', () => {
const entry = document.querySelector("#root");
// render(<App />, entry);

render(
	<ViewContextProvider>
  <BrowserRouter basename={"/"}>
    <App />
  </BrowserRouter>
	</ViewContextProvider>,
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
