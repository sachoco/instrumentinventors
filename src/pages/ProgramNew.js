import React, { useEffect, useContext } from "react";
import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";
import MetaContext from "../store/meta-context";

const ProgramNew = () => {
  const metaCtx = useContext(MetaContext);
  useEffect(() => {
    metaCtx.setTranslation(false);
  }, []);
  return (
    <>
      <Meta title="Program" />

      <Block
        title="Event Program "
        list
        // url="wp/v2/agenda/?subcat=host&pricat=event&upcoming"
        url="wp/v2/agenda/?subcat=host&pricat=event&past"
      />

      <Block
        title="Workshop Program"
        bg={true}
        list
        // url="wp/v2/agenda/?subcat=host&pricat=workshop&upcoming"
        url="wp/v2/agenda/?subcat=host&pricat=workshop&past"
      />

      <Block
        title="In Orbit "
        list
        // url="wp/v2/agenda/?subcat=circulation&upcoming"
        url="wp/v2/agenda/?in_pricat=workshop,residency,event&subcat=circulation&past"
      />
    </>
  );
};

export default ProgramNew;
