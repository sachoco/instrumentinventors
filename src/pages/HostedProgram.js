import React, {useEffect, useContext} from "react";
import Slideshow from "../components/Slideshow";

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

    {/* <Slideshow url="iii/getFeatured/hostedprogram/?" /> */}
    <Slideshow url="/data/featured/hostedprogram" />

    <Block title="hosted events" carousel url="wp/v2/agenda/?subcat=host&pricat=event&upcoming" url2="wp/v2/agenda/?subcat=host&pricat=event&past" />
      
    <Block title="hosted workshops" bg={true} carousel url="wp/v2/agenda/?subcat=host&pricat=workshop&upcoming" url2="wp/v2/agenda/?subcat=host&pricat=workshop&past" />
     
    {/* <Block title="residencies" carousel url="wp/v2/artist/?pricat=resident" /> */}
    <Block title="residencies" carousel url="wp/v2/artist/?pricat=resident&upcoming" url2="wp/v2/artist/?pricat=resident&past" />

    <Block title="hosted programs and series" bg={true} carousel url="wp/v2/project/?pricat=curated_programs&subcat=host" />

  </>
);}

export default HostedProgram;
