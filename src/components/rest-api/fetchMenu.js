import { useEffect, useState } from "react";
import Axios from "axios";

const fetchMenu = (url="iii/menu") => {
  const [state, setState] = useState({
    items: [],
    error: ""
  });
  useEffect(() => {
    const abortController = new AbortController();
    getItems();
    return () => {
      abortController.abort(); // cancel pending fetch request on component unmount
    };
  }, [url]);

  const getItems = () => {
    let rest_call_url = wpApiSettings.root + url;
    console.log(rest_call_url)
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
