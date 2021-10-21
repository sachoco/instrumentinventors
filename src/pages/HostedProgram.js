import React from "react";
import Slideshow from "../components/Slideshow";
import Carousel from "../components/Carousel";
import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";

const HostedProgram = () => (
  <>
    <Meta title="Hosted Program" />

    <Slideshow />
    <Block title="hosted events">
      <Carousel url="wp/v2/agenda/?cat=hosted&subcat=event&_embed" />
    </Block>
    <Block title="hosted workshops" bg={true}>
      <Carousel url="wp/v2/agenda/?cat=hosted&subcat=workshop&_embed" />
    </Block>
    <Block title="residencies">
      <Carousel url="wp/v2/artist/?cat=resident&_embed" />
    </Block>
    <Block title="hosted programs and series" bg={true}>
      <Carousel url="wp/v2/project/?type=curated_programs&cat=hosted&_embed" />
    </Block>
  </>
);

export default HostedProgram;
