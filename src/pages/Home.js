import React, {useEffect, useContext} from "react";
import Slideshow from "../components/Slideshow";
import Carousel from "../components/Carousel";
import HorizontalSlider from "../components/HorizontalSlider";
import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";
import MetaContext from "../store/meta-context";

const Home = () => {
  const metaCtx = useContext(MetaContext);
  useEffect(()=>{
    metaCtx.setTranslation(false);
  },[])
  return (
  <>
    <Meta title="Home" />
    <Slideshow />
    <Block title="hosted program">
      <HorizontalSlider url="wp/v2/agenda/?subcat=host&upcoming" url2="wp/v2/project/?pricat=curated_programs&subcat=host" />
    </Block>
    <Block title="circulation program" bg={true}>
      <HorizontalSlider url="wp/v2/agenda/?subcat=circulation&upcoming" url2="wp/v2/agenda/?in_pricat=workshop,residency&subcat=circulation&past" />
    </Block>
    <Block title="projects">
      <HorizontalSlider url="wp/v2/project/?" />
    </Block>
    <Block title="news & media" bg={true}>
      <HorizontalSlider url="wp/v2/posts/?" />
    </Block>
    <Block title="about iii">
      <p className="max-w-prose">
        iii is an artist run, community platform supporting new
        interdisciplinary practices linking performance, technology and the
        human senses. Arising from the ArtScience tradition of The Hague, iii
        strives to balance technological innovation, theoretical reflection and
        human experience. iii contributes to international developments in the
        field of Art, Science & Technology, functioning both as a cultural
        incubator supporting research and creation, and as an agency connecting
        creators to a broad audience via a wide (inter)national partner network.
      </p>
      <p className="mt-5">
        <button
          className="flex-grow bg-white hover:bg-black hover:text-white border-black border-2 text-black py-1 px-6 font-title"
          type="button"
        >
          more about
        </button>
      </p>
    </Block>
  </>
);
}

export default Home;
