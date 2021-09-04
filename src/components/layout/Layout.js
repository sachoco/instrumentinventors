import React from "react";
import MainNavigation from "./MainNavigation";
import SidebarNavigation from "./SidebarNavigation";
import Footer from "./Footer";
import Signup from "./Signup";
import Overlay from "./Overlay";


const Layout = (props) => (
  <>
    <MainNavigation />
    <SidebarNavigation />
    <div className="pt-14 lg:pt-24 lg:pl-24 overflow-hidden">
      {props.children}
      <Signup />
      <Footer />
      <Overlay />
    </div>
  </>
);

export default Layout;
