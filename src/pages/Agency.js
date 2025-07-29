import React, { useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Slideshow from "../components/Slideshow";

import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";
import MetaContext from "../store/meta-context";
import { Link } from "react-router-dom";

const Agency = () => {
  const metaCtx = useContext(MetaContext);
  let history = useHistory();  
  useEffect(() => {
    metaCtx.setTranslation(false);
  }, []);
  const onClickHandler = (e, link) => {
    e.preventDefault();
    history.push(link);
  };
  return (
    <>
      <Meta title="Agency" />
      {/* <Slideshow url="iii/getFeatured/agency/?" /> */}
      {/* <Slideshow url="/data/featured/agency" /> */}
      <Block title="about iii agency" className="pb-0 lg:pb-0">
        <p className="max-w-prose">
          iii is an artist run, community platform supporting new
          interdisciplinary practices linking performance, technology and the
          human senses. The agency offers both individual works and fully
          curated shows. Shows curated by iii can present a selection of
          existing works as well as a program of completely new commissions
          developed for a specific space and occasion. More info{" "}
          <span
            onClick={(e) => onClickHandler(e, "/about/agency/")}
            className="hover:underline cursor-pointer"
          >
            HERE
          </span>
        </p>
      </Block>

      <Block
        title="in the spotlight"
        carousel
        url="wp/v2/project/?pricat=artworks&is_highlighted"
        // url="wp/v2/project/?cat=curated_programs&subcat=circulation&is_highlighted"
        // url2="wp/v2/agenda/?subcat=circulation&past"
      />

      <Block
        title="artists"
        bg={true}
        carousel
        url="wp/v2/artist/?pricat=agency"
      />

      <Block
        title="agency events"
        carousel
        url="wp/v2/agenda/?subcat=circulation&upcoming&is_agency"
        url2="wp/v2/agenda/?subcat=circulation&past&is_agency"
      />

      {/* <Block
        title="circulation events, workshops and residencies"
        carousel
        url="wp/v2/agenda/?subcat=circulation&upcoming"
        url2="wp/v2/agenda/?subcat=circulation&past"
      /> */}

      <Block
        title="commissions"
        carousel
        url="wp/v2/project/?is_agency&is_commission"
      />

      {/* <Block
        title="curated programs"
        bg={true}
        carousel
        url="wp/v2/project/?cat=curated_programs&subcat=circulation"
      /> */}
    </>
  );
};

export default Agency;
