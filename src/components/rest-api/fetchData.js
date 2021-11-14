import { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";

const fetchData = (url, single = false, concat = true, filter = null) => {
  const initialState = {
    items: [],
    loaded: false,
    error: "",
    hasMore: false,
    page: 1,
    noItem: false,
  };
  const [cookies, setCookie] = useCookies(["lang"]);

  const [state, setState] = useState(initialState);
  useEffect(() => {
    const abortController = new AbortController();
    abortController.abort();
    getItems(true);
    return () => {
      abortController.abort(); // cancel pending fetch request on component unmount
    };
  }, [url, filter, cookies]);

  const getItems = (init = false) => {
    if (init) {
      setState((state) => initialState);
    } else {
      setState({
        ...state,
        loaded: false,
      });
    }
    let rest_call_url = wpApiSettings.root + url;
    if (!single) {
      rest_call_url = rest_call_url + "&page=" + (init ? "1" : state.page);
    }
    if (filter) {
      Object.keys(filter).forEach((key) => {
        if(filter[key]){
          rest_call_url += "&" + key + "=" + filter[key];
        }
      });
    }
    if (cookies.lang == "nl") {
      rest_call_url += "&lang=" + cookies.lang;
    }
    console.log(rest_call_url);
    return Axios.get(rest_call_url).then(
      (response) => {
        console.log(response);
        setState((prevState, props) => ({
          ...state,
          item: response.data[0],
          items: concat ? prevState.items.concat(response.data) : response.data,
          loaded: true,
          page: prevState.page + 1,
          hasMore:
            response.headers["x-wp-totalpages"] > prevState.page ? true : false,
          noItem: response.headers["x-wp-total"] == 0 ? true : false,
        }));
      },
      (error) => {
        console.log("error")
        console.log(error);
        setState((prevState, props) => ({
          ...state,
          error: error.toJSON().message,
          loaded: true,
          hasMore: false,
        }));
      }
    );
  };
  const loadMore = () => {
    state.loaded === true &&
      state.hasMore &&
      getItems().then(() => {
      });
  };

  return [state, loadMore];
};

export default fetchData;
