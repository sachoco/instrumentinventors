import { useEffect, useState } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";

const fetchMenu = (url="/data/menu/") => {
  const [state, setState] = useState({
    items: [],
    error: ""
  });
  const [cookies, setCookie] = useCookies(["lang"]);

  useEffect(() => {
    const abortController = new AbortController();
    getItems();
    return () => {
      abortController.abort(); // cancel pending fetch request on component unmount
    };
  }, [url,cookies]);

  const getItems = () => {
    // let rest_call_url = wpApiSettings.root + url;
    let rest_call_url = url;
    if(cookies.lang=='nl'){
      rest_call_url += 'nl/';
    }else{
      rest_call_url += 'en/';
    }
    rest_call_url += 'data.json';

    console.log(rest_call_url)
    Axios.defaults.headers = {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    };
    return Axios.get(rest_call_url).then(
      (response) => {
        console.log(response.data);
        setState({
          items: response.data,
        });
      },
      (error) => {
        setState((prevState, props) => ({
          ...state,
          error: error.toJSON().message,
        }));
      }
    );
  };

  return state;
};

export default fetchMenu;
