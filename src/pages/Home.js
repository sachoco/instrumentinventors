import React, { useEffect, useContext } from "react";
import Slideshow from "../components/Slideshow";
import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";
import MetaContext from "../store/meta-context";
import { Link } from "react-router-dom";

const Home = () => {
  const metaCtx = useContext(MetaContext);
  useEffect(() => {
    metaCtx.setTranslation(false);
  }, []);
  return (
    <>
      <Meta title="Home" />

      <Slideshow url="/data/featured/home" />

      <Block
        title="hosted program"
        carousel
        url="wp/v2/agenda/?subcat=host&upcoming"
        url2="wp/v2/project/?pricat=curated_programs&subcat=host"
      />

      <Block
        title="circulation program"
        bg={true}
        carousel
        url="wp/v2/agenda/?subcat=circulation&upcoming"
        url2="wp/v2/agenda/?in_pricat=workshop,residency,event&subcat=circulation&past"
      />

      <Block title="projects" carousel url="wp/v2/project/?in_pricat=artworks,editions,workshops" />

      <Block
        debug
        title="news & media"
        bg={true}
        carousel
        url="wp/v2/posts/?"
      />

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
        <p className="mt-5">
          <Link to="/about/mission/">
            <button
              className="flex-grow bg-white hover:bg-black hover:text-white border-black border-2 text-black py-1 px-6 font-title"
              type="button"
            >
              more about
            </button>
          </Link>
        </p>
      </Block>
    </>
  );
};

export default Home;
