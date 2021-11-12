import React from "react";
import Slideshow from "../components/Slideshow";
import Carousel from "../components/Carousel";
import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";

const Home = () => (
  <>
    <Meta title="Home" />
    <Slideshow />
    <Block title="hosted program">
      <Carousel url="wp/v2/agenda/?subcat=host&upcoming&_embed" />
    </Block>
    <Block title="circulation program" bg={true}>
      <Carousel url="wp/v2/agenda/?subcat=circulation&upcoming&_embed" />
    </Block>
    <Block title="projects">
      <Carousel url="wp/v2/project/?_embed" />
    </Block>
    <Block title="news & media" bg={true}>
      <Carousel url="wp/v2/posts/?_embed" />
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

export default Home;
