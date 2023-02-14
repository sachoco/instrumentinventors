import { useEffect, useState } from "react";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.WC_SHOP_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
  axiosConfig: {
	  headers: {}
	}
});

const fetchVariations = (id) => {
  const initialState = {
    items: null,
    loaded: false,
    error: "",
    noItem: false,
  };

  const [state, setState] = useState(initialState);
  const rest_call_url =
    process.env.WC_SHOP_URL + "/wp-json/wc/v2/products/" + id +"/variations";

  useEffect(() => {
    const abortController = new AbortController();
    getItems(true);
    return () => {
      abortController.abort(); // cancel pending fetch request on component unmount
    };
  }, [id]);

  const getItems = (init = false) => {
    // console.log(rest_call_url);
    if (init) {
      setState((state) => initialState);
    } else {
      setState({
        ...state,
        loaded: false,
      });
    }

    return api
      .get("products/"+id+"/variations")
      .then((response) => {
        // console.log(response);
        setState((prevState, props) => {
          return {
            ...state,
            items: response.data.sort((p1,p2)=>(p1.menu_order > p2.menu_order) ? 1 : (p1.menu_order < p2.menu_order) ? -1 : 0 ),
            loaded: true,
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
  // console.log(state.items.sort((p1,p2)=>(p1.menu_order > p2.menu_order) ? 1 : (p1.menu_order < p2.menu_order) ? -1 : 0 ))
  return state;
};

export default fetchVariations;
