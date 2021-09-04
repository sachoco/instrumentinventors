import { useEffect, useState } from 'react';
import { config } from './Constants';

export default function saveUserData( url, userdata ) {
    const wp_root = wpApiSettings.root;//config.url.API_URL;

    return fetch(wp_root+url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
      body: JSON.stringify(userdata) // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
    });
      // .then((response) => return response.json());

}
