import { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";

const fetchFilteredData = (
  filter = null,
) => {

  const prepareUrl = (secondary=false) => {
    let _url = wpApiSettings.root + 'wp/v2/'+filter.posttype+'/?';
    let _url2 = null;
    _url += '&per_page=24&_fields=id,title,slug,formatted_date,date,acf,type,tags,wpml_translations,iii';
    Object.keys(filter).forEach((key) => {
      if (filter[key] && key != "posttype") {
        _url += "&" + key + "=" + filter[key];
      }
    });
    if (cookies.lang == "nl") {
      _url += "&lang=" + cookies.lang;
    }
    if(filter.posttype=="artist"&&filter.pricat==""&&filter.tags==""){
      _url2 = _url+"&past";
      _url += "&current"; 
    }
    if(secondary){
      return _url2;
    }else{
      return _url;
    }
  }

  // const urlRef = useRef(prepareUrl());

  const initialState = {
    items: [],
    loaded: false,
    error: "",
    hasMore: false,
    page: 1,
    noItem: false,
    itemTotal: null,
    hasMoreUrl: false,
  };
  const [cookies, setCookie] = useCookies(["lang"]);

  const [state, setState] = useState(initialState);



  const [query, setQuery] = useState(prepareUrl());

  useEffect(() => {
    const abortController = new AbortController();
    setQuery(prepareUrl());
    return () => {
      abortController.abort(); // cancel pending fetch request on component unmount
    };
  }, [filter, cookies]);

  useEffect(() => {
    const abortController = new AbortController();
    if(query!=prepareUrl(true)){
      getItems(true);
    }
    return () => {
      abortController.abort(); // cancel pending fetch request on component unmount
    };
  }, [query]);

  const getItems = (init = false) => {
    if(!query){
      console.log("no query found...")
      return;
    }

    if (init) {
      setState((state) => initialState);
    } else {
      setState({
        ...state,
        loaded: false,
      });
    }

    let rest_call_url = query;
    rest_call_url = rest_call_url + "&page=" + (init ? "1" : state.page);

    // console.log(rest_call_url);
    return Axios.get(rest_call_url).then(
      (response) => {
        // console.log(response);
        setState((prevState, props) => {
          const _url2 = prepareUrl(true);
          let _hasMore = response.headers["x-wp-totalpages"] > prevState.page;
          if (_url2 && query != _url2 && !_hasMore) {
            setQuery(_url2);
            _hasMore = true;
          }
          return {
            ...state,
            item: Array.isArray(response.data)
              ? response.data[0]
              : response.data,
            items: prevState.items.concat(response.data),
            loaded: true,
            page:
              response.headers["x-wp-totalpages"] > prevState.page || !_url2
                ? prevState.page + 1
                : 1,
            hasMore: _hasMore,
            noItem: response.headers["x-wp-total"] == 0 ? true : false,
            itemTotal: response.headers["x-wp-total"],
            hasMoreUrl: _url2 && query != _url2 ? true : false,
          };
        });
      },
      (error) => {
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
    if (state.loaded === true) {
      if (state.hasMore) {
        getItems().then(() => {});
      }
    }
  };

  return [state, loadMore];
};

export default fetchFilteredData;
