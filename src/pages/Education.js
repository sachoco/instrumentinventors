import React from "react";
import Slideshow from "../components/Slideshow";
import Carousel from "../components/Carousel";
import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";

const Education = () => (
  <>
    <Meta title="Education" />
    <Slideshow url="iii/getFeatured/education" />
    <Block title="hosted workshops">
      <Carousel url="wp/v2/agenda/?subcat=host&cat=workshop&_embed" />
    </Block>
    <Block title="circulation workshops" bg={true}>
      <Carousel url="wp/v2/agenda/?subcat=circulation&cat=workshop&_embed" />
    </Block>
    <Block title="workshop portfolio">
      <Carousel url="wp/v2/project/?cat=workshop&subcat=host&_embed" />
    </Block>
  </>
);

export default Education;
