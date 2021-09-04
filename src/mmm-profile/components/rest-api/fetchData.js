import { useEffect, useState } from 'react';
import { config } from './Constants';

export const fetchData = ( url ) => {
    const [data, setData] = useState(null);
    const wp_root = wpApiSettings.root;//config.url.API_URL;

    useEffect(() => {
        async function loadData() {
            const response = await fetch(wp_root+url, {

            });
            if(!response.ok) {
                // oups! something went wrong
                return;
            }

            const userdata = await response.json();
            setData(userdata);
        }

        loadData();
    }, [url]);
    return data;
}

export const fetchCategories = ( role = 'mmm_creator' ) => {
    const [data, setData] = useState(null);
    const wp_root = wpApiSettings.root;//config.url.API_URL;
    const slug = role=='mmm_creator'?'category_creator':'category_company';
    // const url = 'wp/v2/category_creator/?per_page=100&orderby=term_group&exclude=1';
    const url = 'wp/v2/'+slug+'/?per_page=100&orderby=term_group&exclude=1';

    useEffect(() => {
        async function loadData() {
            const response = await fetch(wp_root+url, {

            });
            if(!response.ok) {
                // oups! something went wrong
                return;
            }

            const categories = await response.json()
            let mainCategories = await categories.filter((cat)=>{
              return (cat.parent==0);
            });
            const sortedCategories = mainCategories.map((parentCat)=>{
              const parentCatId = parentCat.id;
              parentCat.children = categories.filter((cat)=>{
                return (cat.parent == parentCatId);
              });
              return parentCat;
            });
            // console.log(sortedCategories);
            setData(sortedCategories);
        }

        loadData();
    }, [url]);
    return data;
}

export const fetchTags = (  ) => {
    const [data, setData] = useState(null);
    const wp_root = wpApiSettings.root;//config.url.API_URL;
    const url = 'wp/v2/tags/?per_page=100&orderby=term_group';

    useEffect(() => {
        async function loadData() {
            const response = await fetch(wp_root+url, {

            });
            if(!response.ok) {
                // oups! something went wrong
                return;
            }

            const tags = await response.json()

            // console.log(sortedCategories);
            // console.log(tags);

            setData(tags);
        }
        loadData();
    }, [url]);
    return data;
}

export const fetchSuggestedMembers = ( userId ) => {
    const [data, setData] = useState(null);
    const wp_root = wpApiSettings.root;//config.url.API_URL;
    const url = 'mmm/v1/members/suggested/'+userId;

    useEffect(() => {
        async function loadData() {
            const response = await fetch(wp_root+url, {

            });
            if(!response.ok) {
                // oups! something went wrong
                return;
            }

            const data = await response.json()

            // console.log(sortedCategories);
            console.log(data);

            setData(data);
        }
        loadData();
    }, [userId]);
    return data;
}

export const fetchRelatedPosts = ( userId ) => {
    const [data, setData] = useState(null);
    const wp_root = wpApiSettings.root;//config.url.API_URL;
    const url = 'mmm/v1/members/related/'+userId;

    useEffect(() => {
        async function loadData() {
            const response = await fetch(wp_root+url, {

            });
            if(!response.ok) {
                // oups! something went wrong
                return;
            }

            const data = await response.json()

            // console.log(sortedCategories);
            console.log(data);

            setData(data);
        }
        loadData();
    }, [userId]);
    return data;
}

export const fetchFollowingMembers = ( userId ) => {
    const [data, setData] = useState(null);
    const wp_root = wpApiSettings.root;//config.url.API_URL;
    const url = 'mmm/v1/members/followingmembers/'+userId;

    useEffect(() => {
        async function loadData() {
            const response = await fetch(wp_root+url, {

            });
            if(!response.ok) {
                // oups! something went wrong
                return;
            }

            const data = await response.json()

            // console.log(sortedCategories);
            console.log(data);

            setData(data);
        }
        loadData();
    }, [userId]);
    return data;
}

export const fetchFollowers = ( userId ) => {
    const [data, setData] = useState(null);
    const wp_root = wpApiSettings.root;//config.url.API_URL;
    const url = 'mmm/v1/members/followers/'+userId;

    useEffect(() => {
        async function loadData() {
            const response = await fetch(wp_root+url, {

            });
            if(!response.ok) {
                // oups! something went wrong
                return;
            }

            const data = await response.json()

            // console.log(sortedCategories);
            console.log(data);

            setData(data);
        }
        loadData();
    }, [userId]);
    return data;
}

export const fetchFollowings = ( user ) => {
    // const [data, setData] = useState(null);
    const wp_root = wpApiSettings.root;//config.url.API_URL;
    const url = 'mmm/v1/members/followings/'+user;

    return fetch(wp_root+url, {
      // method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': wpApiSettings.nonce,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(userdata) // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
    });
    // useEffect(() => {
    //     async function loadData() {
    //         const response = await fetch(wp_root+url, {
    //
    //         });
    //         if(!response.ok) {
    //             // oups! something went wrong
    //             return;
    //         }
    //
    //         const res = await response.json()
    //         console.log(res);
    //         setData(res);
    //     }
    //     loadData();
    // }, []);
    // return data;
}
