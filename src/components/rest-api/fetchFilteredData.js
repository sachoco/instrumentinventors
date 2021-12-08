import { useEffect, useState } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";

const fetchFilteredData = (url, single = false, concat = true, filter = null, url2=null) => {
	let _url = url;
	const initialState = {
		items: [],
		loaded: false,
		error: "",
		hasMore: false,
		page: 1,
		noItem: false,
		itemTotal: null,
	};
	const [cookies, setCookie] = useCookies(["lang"]);

	const [state, setState] = useState(initialState);
	useEffect(() => {
		const abortController = new AbortController();
		getItems(true);
		return () => {
			abortController.abort(); // cancel pending fetch request on component unmount
		};
	}, [filter, cookies]);

	const getItems = (init = false) => {
		if (init) {
			setState((state) => initialState);
		} else {
			setState({
				...state,
				loaded: false,
			});
		}
		let rest_call_url = wpApiSettings.root + _url;
		if (!single) {
			rest_call_url = rest_call_url + "&page=" + (init ? "1" : state.page);
		}
		if (filter) {
			console.log(filter)
			Object.keys(filter).forEach((key) => {
				if(filter[key]&&key!="posttype"){
					rest_call_url += "&" + key + "=" + filter[key];
				}
			});
		}
		if (cookies.lang == "nl") {
			rest_call_url += "&lang=" + cookies.lang;
		}
		// if (single&&cookies.lang == "nl") {
		// rest_call_url += "&lang=" + cookies.lang;
		// }else{
		// // rest_call_url += "&lang=en";
		// }
		console.log(rest_call_url);
		return Axios.get(rest_call_url).then(
			(response) => {
				console.log(response);
				setState((prevState, props) => ({
					...state,
					item: Array.isArray(response.data) ? response.data[0] : response.data,
					items: concat ? prevState.items.concat(response.data) : response.data,
					loaded: true,
					page: response.headers["x-wp-totalpages"] > prevState.page||!url2 ? prevState.page + 1 : 1,
					hasMore:
						response.headers["x-wp-totalpages"] > prevState.page ? true : false,
					noItem: response.headers["x-wp-total"] == 0 ? true : false,
						itemTotal: response.headers["x-wp-total"],
				}));
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
		if(state.loaded === true){
			if(state.hasMore){
				getItems().then(() => {})
			}else if(url2){
				_url=url2;
				getItems().then(()=>{})
			}
		} 
	};

	return [state, loadMore];
};

export default fetchFilteredData;
