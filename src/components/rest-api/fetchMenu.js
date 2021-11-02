import { useEffect, useState } from "react";
import Axios from "axios";

const fetchMenu = (url="iii/menu") => {
  const [state, setState] = useState({
    items: [],
    error: ""
  });
  useEffect(() => {
    getItems();
  }, [url]);

  const getItems = () => {
    let rest_call_url = wpApiSettings.root + url;

    return Axios.get(rest_call_url).then(
      (response) => {
        // console.log(response.data);
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
