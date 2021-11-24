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
		getItem();
		return () => {
			abortController.abort(); // cancel pending fetch request on component unmount
		};
	}, [url, cookies]);

	const getItem = () => {
		setState({
			...state,
			loaded: false,
		});
		if (cookies.lang == "nl") {

		}

		console.log(url);
		return Axios.get(url).then(
			(response) => {
				console.log(response.data);
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
