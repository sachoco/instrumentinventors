import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useHistory } from "react-router-dom";

export default function LanguageSelect(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["lang"]);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const initLang = queryParams.get("lang") ? queryParams.get("lang") : "";
  let history = useHistory();
  const [lang, setLang] = useState(cookies.lang);

  const onClickHandler = (lang) => {
    setCookie("lang", lang, { path: "/" });
    setLang(lang);
    let query = "";
    if (!queryParams) {
      query += "?";
    }
    if (lang == "nl") {
      query += "lang=nl";
    }
    history.push({
      search: query,
    });
    props.onClick && props.onClick()
  };
  useEffect(() => {
    console.log(initLang);
    if (initLang) {
      setCookie("lang", initLang, { path: "/" });
      setLang(initLang);
    }else{
      // removeCookie("lang");
      if(!cookies.lang){
        setCookie("lang", "en", { path: "/" });
        setLang("en");
      }
    }
  }, [initLang]);
  return (
    <div className={props.className}>
      <button
        onClick={() => onClickHandler("en")}
        className={lang != "nl" ? `font-bold` : ``}
      >
        en
      </button>
      /
      <button
        onClick={() => onClickHandler("nl")}
        className={lang == "nl" ? `font-bold` : ``}
      >
        nl
      </button>
    </div>
  );
}
