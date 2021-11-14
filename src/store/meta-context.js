import React, { createContext, useState } from "react";
import getTitle from "../components/utilities/getTitle";


const MetaContext = createContext({
  title: "",
  translation: false,
  setTitle: (title) => {},
  setTranslation: (boolean) => {},
});

export const MetaContextProvider = (props) => {
  const [pageTitle, setPageTitle] = useState(getTitle());
  const [showTranslation, setShowTranslation] = useState(false);

  const changeTitleHandler = (title) => {
    setPageTitle(title);
  };
  const setTranslationHandler = (boolean) => {
    setShowTranslation(boolean);
  };
  const context = {
    title: pageTitle,
    translation: showTranslation,
    setTitle: changeTitleHandler,
    setTranslation: setTranslationHandler,
  };

  return (
    <MetaContext.Provider value={context}>
      {props.children}
    </MetaContext.Provider>
  );
};

export default MetaContext;
