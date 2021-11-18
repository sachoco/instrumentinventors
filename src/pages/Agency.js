import React, {useEffect, useContext} from "react";
import Slideshow from "../components/Slideshow";
import Carousel from "../components/Carousel";
import HorizontalSlider from "../components/HorizontalSlider";

import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";
import MetaContext from "../store/meta-context";

const Agency = () => {
  const metaCtx = useContext(MetaContext);
  useEffect(()=>{
    metaCtx.setTranslation(false);
  },[])
  return (
  <>
    <Meta title="Agency" />
    <Slideshow url="iii/getFeatured/agency/?" />
    <Block title="circulation events, workshops and residencies">
      <Carousel url="wp/v2/agenda/?subcat=circulation" />
    </Block>
    <Block title="artists" bg={true}>
      <Carousel url="wp/v2/artist/?cat=agency" />
    </Block>
    <Block title="artworks">
      <Carousel url="wp/v2/project/?is_agency" />
    </Block>
    <Block title="curated programs" bg={true}>
      <Carousel url="wp/v2/project/?cat=curated_programs&subcat=circulation" />
    </Block>
  </>
);
  }

export default Agency;
