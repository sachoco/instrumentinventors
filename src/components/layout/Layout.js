import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import SignupForm from "./SignupForm";
import Overlay from "./Overlay";

const Layout = (props) => (
  <>
    <Navigation />
    <div className="relative z-10 pt-14 lg:pt-24 lg:pl-24 overflow-hidden">
      {props.children}
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
    </div>
  </>
);

export default Layout;
