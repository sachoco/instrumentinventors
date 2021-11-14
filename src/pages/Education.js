import React, {useEffect} from "react";
import Slideshow from "../components/Slideshow";
import Carousel from "../components/Carousel";
import HorizontalSlider from "../components/HorizontalSlider";

import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";
import MetaContext from "../store/meta-context";

const Education = () => {
  const metaCtx = useContext(MetaContext);
  useEffect(()=>{
    metaCtx.setTranslation(true);
  },[])
  return (
    <>
      <Meta title="Education" />
      <Slideshow url="iii/getFeatured/education" />
      <Block title="hosted workshops">
        <HorizontalSlider url="wp/v2/agenda/?subcat=host&cat=workshop&_embed" />
      </Block>
      <Block title="circulation workshops" bg={true}>
        <HorizontalSlider url="wp/v2/agenda/?subcat=circulation&cat=workshop&_embed" />
      </Block>
      <Block title="workshop portfolio">
        <HorizontalSlider url="wp/v2/project/?cat=workshop&subcat=host&_embed" />
      </Block>
    </>
  );
};

export default Education;
