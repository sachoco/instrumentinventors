import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import Feed from "./Feed";

const InstaFeeds = ({ token, ...props }) => {
  const [feeds, setFeedsData] = useState([]);
  //use useRef to store the latest value of the prop without firing the effect
  const tokenProp = useRef(token);
  tokenProp.current = token;

  useEffect(() => {
    // this is to avoid memory leaks
    const abortController = new AbortController();

    async function fetchInstagramPost() {
      try {
        axios
          .get(
            `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&limit=${props.limit}&access_token=${token}`
          )
          .then((resp) => {
            setFeedsData(resp.data.data);
          });
      } catch (err) {
        console.log("error", err);
      }
    }

    // manually call the fecth function
    fetchInstagramPost();

    return () => {
      // cancel pending fetch request on component unmount
      abortController.abort();
    };
  }, [props.limit]);

  return (
    <Grid container spacing={1}>
      {feeds.map((feed, key) => (
        <Grid item xs={2} key={key}>
          <Feed key={feed.id} feed={feed} />
        </Grid>
      ))}
    </Grid>
  );
};

export default InstaFeeds;
