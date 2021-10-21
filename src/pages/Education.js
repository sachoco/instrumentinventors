import React from "react";
import Slideshow from "../components/Slideshow";
import Carousel from "../components/Carousel";
import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";

const Education = () => (
  <>
    <Meta title="Education" />

    <Block title="hosted workshops, current and upcoming">
      <Carousel url="wp/v2/agenda/?cat=hosted&subcat=workshops&upcoming&_embed" />
    </Block>
    <Block title="circulation workshops, current and upcoming" bg={true}>
      <Carousel url="wp/v2/agenda/?cat=circulation&subcat=workshops&upcoming&_embed" />
    </Block>
    <Block title="workshops, highlighted">
      <Carousel url="wp/v2/project/?type=workshops&is_highlighted&&_embed" />
    </Block>
  </>
);

export default Education;
