import React from "react";
import Slideshow from "../components/Slideshow";
import Carousel from "../components/Carousel";
import HorizontalSlider from "../components/HorizontalSlider";

import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";

const HostedProgram = () => (
  <>
    <Meta title="Hosted Program" />

    <Slideshow />
    <Block title="hosted events">
      <Carousel url="wp/v2/agenda/?subcat=host&cat=event" />
    </Block>
    <Block title="hosted workshops" bg={true}>
      <Carousel url="wp/v2/agenda/?subcat=host&cat=workshop" />
    </Block>
    <Block title="residencies">
      <Carousel url="wp/v2/artist/?cat=resident" />
    </Block>
    <Block title="hosted programs and series" bg={true}>
      <Carousel url="wp/v2/project/?cat=curated_programs&subcat=host" />
    </Block>
  </>
);

export default HostedProgram;
