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

    <Slideshow />
    <Block title="hosted events" carousel url="wp/v2/agenda/?subcat=host&pricat=event" />
      
    <Block title="hosted workshops" bg={true} carousel url="wp/v2/agenda/?subcat=host&pricat=workshop" />
     
    <Block title="residencies" carousel url="wp/v2/artist/?pricat=resident" />

    <Block title="hosted programs and series" bg={true} carousel url="wp/v2/project/?pricat=curated_programs&subcat=host" />

  </>
);}

export default HostedProgram;
