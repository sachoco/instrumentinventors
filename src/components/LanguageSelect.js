import React, { useState } from "react";
import { useCookies } from 'react-cookie';

export default function LanguageSelect(props) {
  const [cookies, setCookie] = useCookies(['lang']);

  const [lang, setLang] = useState(cookies.lang);

  const onClickHandler = (lang) => {
    setCookie('lang', lang, { path: '/' });
    setLang(lang);
  };
  return (
    <div className={props.className}>
      <button onClick={()=>onClickHandler("en")} className={lang!='nl' ? `font-bold`:``}>en</button>
      /
      <button onClick={()=>onClickHandler("nl")} className={lang=='nl' ? `font-bold`:``}>nl</button>
    </div>
  );
}
