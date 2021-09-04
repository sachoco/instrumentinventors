import { useEffect, useState } from 'react';
import Axios from 'axios';


async function instagramPhotos () {
    // It will contain our photos' links
    const res = []

    try {
        const userInfoSource = await Axios.get('https://www.instagram.com/theraloss/')

        // userInfoSource.data contains the HTML from Axios
        const jsonObject = userInfoSource.data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1)

        const userInfo = JSON.parse(jsonObject)
        // Retrieve only the first 10 results
        const mediaArray = userInfo.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(0, 10)
        for (let media of mediaArray) {
            const node = media.node

            // Process only if is an image
            if ((node.__typename && node.__typename !== 'GraphImage')) {
                continue
            }

            // Push the thumbnail src in the array
            res.push(node.thumbnail_src)
        }
    } catch (e) {
        console.error('Unable to retrieve photos. Reason: ' + e.toString())
    }
    console.log(res);

    return res
}

export default function fetchData( _username ) {
    const [data, setData] = useState(null);
    const url = "https://www.instagram.com/"+_username+"/?__a=1";
    let res;

    useEffect(() => {
        async function loadData() {
            const response = await fetch( url, {
              // method: 'GET', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, *cors, same-origin
              // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              // credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json',
                // 'X-WP-Nonce': wpApiSettings.nonce
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              // redirect: 'follow', // manual, *follow, error
              //
              // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              // body: JSON.stringify(data) // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
            });
            if(!response.ok) {
                // oups! something went wrong
                return;
            }

            const _data = await response.json();
            console.log(_data);
            setData(_data.graphql.user.edge_owner_to_timeline_media.edges);
        }
        loadData();
        // res = instagramPhotos();
    }, [_username]);
    return data;
}
