import { useEffect, useState } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";

const fetchJson = (url) => {
  const initialState = {
    loaded: false,
    error: "",
  };
  const [cookies, setCookie] = useCookies(["lang"]);

  const [state, setState] = useState(initialState);
  useEffect(() => {
    const abortController = new AbortController();
    let _url = "";
    if (cookies.lang == "nl") {
      _url = url + "/nl/data.json";
      Axios.get(_url)
        .then((response) => {
          getItem(_url);
        })
        .catch((error) => {
          _url = url + "/en/data.json";
          getItem(_url);
        });
    } else {
      _url = url + "/en/data.json";
      getItem(_url);
    }

    return () => {
      abortController.abort(); // cancel pending fetch request on component unmount
    };
  }, [url, cookies]);

  const getItem = (_url) => {
    setState(initialState);
    const timestamp = new Date().getTime();
    // _url += _url + '?timestamp='+ timestamp;
    // console.log(_url);
    Axios.defaults.headers = {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    };
    return Axios.get(_url).then(
      (response) => {
        // console.log(response.data);
        setState((prevState, props) => ({
          ...state,
          item: response.data,
          loaded: true,
        }));
      },
      (error) => {
        console.log(error);
        setState((prevState, props) => ({
          ...state,
          error: error.toJSON().message,
          loaded: true,
        }));
      }
    );
  };

  return state;
};

export default fetchJson;
