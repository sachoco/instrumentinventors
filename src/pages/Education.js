import React, { useEffect, useContext } from "react";
import Slideshow from "../components/Slideshow";

import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";
import MetaContext from "../store/meta-context";

const Education = () => {
  const metaCtx = useContext(MetaContext);
  useEffect(() => {
    metaCtx.setTranslation(true);
  }, []);
  return (
    <>
      <Meta title="Education" />
      {/* <Slideshow url="iii/getFeatured/education/?" /> */}
      <Slideshow url="/data/featured/education" />
      <Block
        title="hosted workshops"
        carousel
        url="wp/v2/agenda/?subcat=host&pricat=workshop"
      />

      <Block
        title="circulation workshops"
        bg={true}
        carousel
        url="wp/v2/agenda/?subcat=circulation&pricat=workshop"
      />

      <Block
        title="workshop portfolio"
        carousel
        url="wp/v2/project/?pricat=workshop"
      />
    </>
  );
};

export default Education;
