import React, { useContext } from "react";
import { useParams } from "react-router";
import MetaContext from "../store/meta-context";

import fetchData from "../components/rest-api/fetchData";

import Gallery from "../components/Gallery";
import Carousel from "../components/Carousel";
import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";
import normalizePosttype from "../components/utilities/normalizePosttype";
import getTitle from "../components/utilities/getTitle";

const SinglePostPage = ({ ...otherProps }) => {
  const metaCtx = useContext(MetaContext);

  const { p1, p2 } = useParams();
  const posttype =
    wpApiSettings.posttype == "page"
      ? "pages"
      : wpApiSettings.posttype == "post"
      ? "posts"
      : wpApiSettings.posttype;
  const slug = p2 ? p2 : p1;
  const url = "wp/v2/posts/?slug=" + slug + "&include_page&_embed";

  const [state, loadMore] = fetchData(url, true);
  const { title, content } = normalizePosttype(state.item);
  metaCtx.changeTitle(getTitle(state.item));

  return (
    <>
      <Meta title={title} />

      <Block className="single-item-content ">
        {content}

        <div className="max-w-3xl  font-bold lg:font-normal text-base lg:text-2xl"></div>
        <div className="mt-10 mx-auto max-w-3xl"></div>
      </Block>
      <Block title="related" bg={true}>
        <Carousel />
      </Block>
    </>
  );
};

export default SinglePostPage;
