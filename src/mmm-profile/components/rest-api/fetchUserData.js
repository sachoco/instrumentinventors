import { useEffect, useState } from "react";
import { config } from "./Constants";

export default function fetchUserData(url, initState = null) {
  const [data, setData] = useState(null);
  const wp_root = wpApiSettings.root; //config.url.API_URL;

  useEffect(() => {
    async function loadData() {
      const response = await fetch(wp_root + url, {
        // method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": wpApiSettings.nonce,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data) // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
      });
      if (!response.ok) {
        // oups! something went wrong
        return;
      }

      const userdata = await response.json();
      // console.log(userdata.acf);
      //


      if (initState) {
        for (let key in userdata.acf) {
          if (["language"].includes(key) && userdata.acf[key]) {
            userdata.acf[key] = userdata.acf[key].map((item) => {
              return `${item.value}`;
            });
          } else if (
            ["fields", "looking_for", "interests", "offer"].includes(key) &&
            userdata.acf[key]
          ) {
            userdata.acf[key] = userdata.acf[key].map((item) => {
              return item.term_id;
            });
          } else if (["profile_picture"].includes(key) && userdata.acf[key]) {
            userdata.acf[key] = {
              id: userdata.acf[key].id,
              url: userdata.acf[key].sizes.thumbnail,
            };
          } else if (["slideshow"].includes(key) && userdata.acf[key]) {
            userdata.acf[key] = userdata.acf[key].map((item) => {
              return {
                image: {
                  id: item.image.id,
                  url: item.image.sizes.large,
                },
              };
            });
          } else if (["stories"].includes(key) && userdata.acf[key]) {
            userdata.acf[key] = userdata.acf[key].map((item) => {
              let obj = {
                ...item,
                image: {
                  id: item.image.id,
                  url: item.image.sizes.medium,
                },
              };
              return obj;
            });
          } else if (["projects"].includes(key) && userdata.acf[key]) {
            userdata.acf[key] = userdata.acf[key].map((item) => {
              let convertedTags = item.tags && item.tags.map((t) => {
                return t.term_id;
              });
              let obj = {
                ...item,
                tags: convertedTags,
              };
              return obj;
            });
          }
        }

        initState(userdata);
      }
      console.log(userdata);

      setData(userdata);
    }

    loadData();
  }, [url]);
  return data;
}
