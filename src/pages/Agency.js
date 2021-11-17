import React from "react";
import Slideshow from "../components/Slideshow";
import Carousel from "../components/Carousel";
import HorizontalSlider from "../components/HorizontalSlider";

import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";

const Agency = () => (
  <>
    <Meta title="Agency" />
    <Slideshow url="iii/getFeatured/agency/?" />
    <Block title="circulation events, workshops and residencies">
      <Carousel url="wp/v2/agenda/?subcat=circulation&_embed" />
    </Block>
    <Block title="artists" bg={true}>
      <Carousel url="wp/v2/artist/?cat=agency&_embed" />
    </Block>
    <Block title="artworks">
      <Carousel url="wp/v2/project/?is_agency&_embed" />
    </Block>
    <Block title="curated programs" bg={true}>
      <Carousel url="wp/v2/project/?cat=curated_programs&subcat=circulation&_embed" />
    </Block>
  </>
);

export default Agency;
