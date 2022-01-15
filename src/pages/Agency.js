import React, {useEffect, useContext} from "react";
import Slideshow from "../components/Slideshow";

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
    {/* <Slideshow url="iii/getFeatured/agency/?" /> */}
    <Slideshow url="/data/featured/agency" />

    <Block title="circulation events, workshops and residencies" carousel url="wp/v2/agenda/?subcat=circulation" />

    <Block title="artists" bg={true} carousel url="wp/v2/artist/?pricat=agency" />
      
    <Block title="artworks" carousel url="wp/v2/project/?is_agency" />
      
    <Block title="curated programs" bg={true} carousel url="wp/v2/project/?cat=curated_programs&subcat=circulation"/ >

  </>
);
  }

export default Agency;
