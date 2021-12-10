import { useEffect, useState } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

const fetchPage = ({path, loadedPages}) => {
	const url = "iii/pages/" + path + "?";
	const initialState = {
		item: {},
		loaded: false,
		error: "",
	};
	const [cookies, setCookie] = useCookies(["lang"]);
	const { pathname } = useLocation();

	const [state, setState] = useState(initialState);
	useEffect(() => {
		const abortController = new AbortController();
		if(loadedPages.length>0){
			if(loadedPages.find(obj => obj.iii.path.includes(path))){
				setState((prevState, props) => ({
					...state,
					item: loadedPages.find(obj => obj.iii.path.includes(path)),
					loaded: true,
				}));
				console.log("found in loadedPages")
			}else{
				getItems();
			}
		}
		
		return () => {
			abortController.abort(); // cancel pending fetch request on component unmount
		};
	}, [path, loadedPages, cookies]);

	const getItems = () => {
		setState(initialState);
		let rest_call_url = wpApiSettings.root + url;

		if (cookies.lang == "nl") {
			rest_call_url += "&lang=" + cookies.lang;
		}
		console.log(rest_call_url);

		return Axios.get(rest_call_url).then(
			(response) => {
				console.log(response);
				setState((prevState, props) => ({
					...state,
					item: Array.isArray(response.data) ? response.data[0] : response.data,
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

export default fetchPage;
