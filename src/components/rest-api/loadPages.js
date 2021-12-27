import { useEffect, useState } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";

const loadPages = (menu) => {

	const [cookies, setCookie] = useCookies(["lang"]);

	const initialState = {
		items: [],
		loaded: false,
		error: "",
	};

	const [state, setState] = useState(initialState);
	useEffect(() => {
		const abortController = new AbortController();
		if(Object.keys(menu).length>0){ getItems(menu); }

		return () => {
			abortController.abort(); // cancel pending fetch request on component unmount
		};
	}, [menu,cookies]);

	const getItems = (menu) => {
		const ids = getPageIDs(menu).join(',');
		let rest_call_url = wpApiSettings.root + "wp/v2/pages?per_page=100&&_fields=id,title,content,slug,formatted_date,acf,type,tags,wpml_translations,iii";

		rest_call_url += "&include=" + ids;

		if (cookies.lang) {
			rest_call_url += "&lang=" + cookies.lang;
		}
		console.log(rest_call_url);

		setState({
			...state,
			loaded: false,
		});
		return Axios.get(rest_call_url).then(
			(response) => {
				console.log(response);
				setState((prevState, props) => ({
					...state,
					items: response.data,
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
	const getPageIDs = (menu) => {
		delete menu["main-menu"];
		const IDs = Object.keys(menu).map((key)=>{
			if(key!="main-menu"){
				return menu[key].map((obj)=>(obj.page_id));
			}
		}).flat();
		return IDs;
		// console.log(IDs)
	}
	return state.items;
};

export default loadPages;
