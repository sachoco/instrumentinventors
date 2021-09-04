import React from "react";
import Slideshow from "../components/Slideshow";
import Carousel from "../components/Carousel";
import Block from "../components/layout/Block";

const HostedProgram = () => (
  <>
    <Slideshow />
    <Block title="hosted events">
      <Carousel />
    </Block>
    <Block title="hosted workshops" bg={true}>
      <Carousel />
    </Block>
    <Block title="residencies">
      <Carousel />
    </Block>
    <Block title="hosted programs and series" bg={true}>
      <Carousel />
    </Block>

  </>
);

export default HostedProgram;
