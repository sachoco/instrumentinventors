import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import SignupForm from "./SignupForm";
import Overlay from "./Overlay";
import SidebarNavigation from "./SidebarNavigation";
import fetchMenu from "../rest-api/fetchMenu";



const Layout = ({menuItems, ...props}) => {
  // const menuItems = fetchMenu();
  return (
    <>
      <Navigation menuItems={menuItems} />
      <div className="flex">
        <SidebarNavigation menuItems={menuItems} />
        <div className="relative flex-grow z-10 pt-14 lg:pt-24 lg:ml-24 overflow-hidden">
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
      </div>
    </>
  );
};

export default Layout;
