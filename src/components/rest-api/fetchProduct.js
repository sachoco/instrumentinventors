import { useEffect, useState } from "react";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.WC_SHOP_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
});

const fetchProduct = (id) => {
  const initialState = {
    item: {},
    loaded: false,
    error: "",
    noItem: false,
  };

  const [state, setState] = useState(initialState);
  const rest_call_url =
    process.env.WC_SHOP_URL + "/wp-json/wc/v2/products/" + id;

  useEffect(() => {
    const abortController = new AbortController();
    getItems(true);
    return () => {
      abortController.abort(); // cancel pending fetch request on component unmount
    };
  }, [id]);

  const getItems = (init = false) => {
    console.log(rest_call_url);
    if (init) {
      setState((state) => initialState);
    } else {
      setState({
        ...state,
        loaded: false,
      });
    }

    return api
      .get("products/"+id)
      .then((response) => {
        // console.log(response);
        setState((prevState, props) => {
          return {
            ...state,
            item: Array.isArray(response.data)
              ? response.data[0]
              : response.data,
            loaded: true,
            noItem: response.headers["x-wp-total"] == 0 && !url2 ? true : false,
          };
        });
      })
      .catch((error) => {
        setState((prevState, props) => ({
          ...state,
          error: error.toJSON().message,
          loaded: true,
        }));
      })
      .finally(() => {
        // Always executed.
      });
  };

  return state;
};

export default fetchProduct;
