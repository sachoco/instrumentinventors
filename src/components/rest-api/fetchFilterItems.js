import { useEffect, useState } from "react";
import Axios from "axios";

const fetchFilterItems = (posttype) => {
  const [state, setState] = useState({
    items: {},
    error: "",
  });
  const url = "iii/filterItems/" + posttype;
  useEffect(() => {
    const abortController = new AbortController();
    getItems();
    return () => {
      abortController.abort(); // cancel pending fetch request on component unmount
    };
  }, [posttype]);

  const getItems = () => {
    let rest_call_url = wpApiSettings.root + url;

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

export default fetchFilterItems;