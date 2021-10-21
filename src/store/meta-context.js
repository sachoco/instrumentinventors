import React, { createContext, useState } from "react";
import getTitle from "../components/utilities/getTitle";


const MetaContext = createContext({
  title: "",
  changeView: (mode) => {},
});

export const MetaContextProvider = (props) => {
  const [title, setTitle] = useState(getTitle());

  const changeTitleHandler = (title) => {
    setTitle(title);
  };

  const context = {
    title: title,
    changeTitle: changeTitleHandler,
  };

  return (
    <MetaContext.Provider value={context}>
      {props.children}
    </MetaContext.Provider>
  );
};

export default MetaContext;
