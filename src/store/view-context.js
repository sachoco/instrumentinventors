import React, { createContext, useState } from "react";

const ViewContext = createContext({
  mode: "tile",
  changeView: (mode) => {},
});

export const ViewContextProvider = (props) => {
  const [userView, setUserView] = useState("tile");

  const changeViewHandler = (mode) => {
    setUserView(mode);
  };

  const context = {
    mode: userView,
    changeView: changeViewHandler,
  };

  return (
    <ViewContext.Provider value={context}>
      {props.children}
    </ViewContext.Provider>
  );
};

export default ViewContext;
