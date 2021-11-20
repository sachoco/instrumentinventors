import React, {useEffect, useContext} from "react";
import Slideshow from "../components/Slideshow";
import Carousel from "../components/Carousel";
import HorizontalSlider from "../components/HorizontalSlider";

import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";
import MetaContext from "../store/meta-context";

const HostedProgram = () => {
  const metaCtx = useContext(MetaContext);
  useEffect(()=>{
    metaCtx.setTranslation(false);
  },[])
  return (
  <>
    <Meta title="Hosted Program" />

    <Slideshow />
    <Block title="hosted events">
      <Carousel url="wp/v2/agenda/?subcat=host&pricat=event" />
    </Block>
    <Block title="hosted workshops" bg={true}>
      <Carousel url="wp/v2/agenda/?subcat=host&pricat=workshop" />
    </Block>
    <Block title="residencies">
      <Carousel url="wp/v2/artist/?pricat=resident" />
    </Block>
    <Block title="hosted programs and series" bg={true}>
      <Carousel url="wp/v2/project/?pricat=curated_programs&subcat=host" />
    </Block>
  </>
);}

export default HostedProgram;
