import React from "react";
import Slideshow from "../components/Slideshow";
import Carousel from "../components/Carousel";
import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";

const Agency = () => (
  <>
    <Meta title="Agency" />
    <Block title="circulation events, workshops and residencies">
      <Carousel url="wp/v2/agenda/?cat=circulation&_embed" />
    </Block>
    <Block title="artists" bg={true}>
      <Carousel url="wp/v2/artist/?is_highlighted&_embed" />
    </Block>
    <Block title="artworks">
      <Carousel url="wp/v2/project/?is_agency&is_highlighted&&_embed" />
    </Block>
    <Block title="curated programs" bg={true}>
      <Carousel url="wp/v2/project/?type=curated_programs&cat=circulation&_embed" />
    </Block>
  </>
);

export default Agency;
