import React, { useEffect, useContext } from "react";
import Slideshow from "../components/Slideshow";

import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";
import MetaContext from "../store/meta-context";

const Agency = () => {
  const metaCtx = useContext(MetaContext);
  useEffect(() => {
    metaCtx.setTranslation(false);
  }, []);
  return (
    <>
      <Meta title="Agency" />
      {/* <Slideshow url="iii/getFeatured/agency/?" /> */}
      {/* <Slideshow url="/data/featured/agency" /> */}
      <Block title="about iii">
        <p className="max-w-prose">
          iii is an artist run, community platform supporting new
          interdisciplinary practices linking performance, technology and the
          human senses. Arising from the ArtScience tradition of The Hague, iii
          strives to balance technological innovation, theoretical reflection
          and human experience. iii contributes to international developments in
          the field of Art, Science & Technology, functioning both as a cultural
          incubator supporting research and creation, and as an agency
          connecting creators to a broad audience via a wide (inter)national
          partner network.
        </p>
      </Block>

      <Block
        title="in the spotlight"
        carousel
        url="wp/v2/project/?pricat=artworks&is_highlighted"
        // url="wp/v2/project/?cat=curated_programs&subcat=circulation&is_highlighted"
        // url2="wp/v2/agenda/?subcat=circulation&past"
      />

      <Block
        title="artists"
        bg={true}
        carousel
        url="wp/v2/artist/?pricat=agency"
      />

      <Block
        title="agency events"
        carousel
        url="wp/v2/agenda/?subcat=circulation&upcoming&is_agency"
        url2="wp/v2/agenda/?subcat=circulation&past&is_agency"
      />

      {/* <Block
        title="circulation events, workshops and residencies"
        carousel
        url="wp/v2/agenda/?subcat=circulation&upcoming"
        url2="wp/v2/agenda/?subcat=circulation&past"
      /> */}

      <Block title="commissions" carousel url="wp/v2/project/?is_agency&is_commission" />

      {/* <Block
        title="curated programs"
        bg={true}
        carousel
        url="wp/v2/project/?cat=curated_programs&subcat=circulation"
      /> */}
    </>
  );
};

export default Agency;
