import React from "react";
import HeaderImage from "../components/HeaderImage";
import Gallery from "../components/Gallery";
import Carousel from "../components/Carousel";
import Block from "../components/layout/Block";

const SingleArtist = () => (
  <>
    <HeaderImage />
    <div className="px-16 lg:px-24 pt-10">
      <button className="relative">
        <svg
          className="absolute"
          style={{ left: "-40px", top:"7px" }}
          width="28px"
          height="13px"
          viewBox="0 0 28 13"
        >
          <g
            id="Group"
            transform="translate(2.000000, 1.000000)"
            stroke="#000000"
            strokeWidth="2"
          >
            <line x1="25.977" y1="5.599" x2="0" y2="5.599" id="Line_130"></line>
            <polyline
              id="Path_31324"
              points="5.601 0 0.000999999999 5.6 5.601 11.2"
            ></polyline>
          </g>
          ;
        </svg>
        back to artists
      </button>
    </div>

    <Block>
      <p className="max-w-3xl  font-bold lg:font-normal text-base lg:text-2xl">
        Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras
        ultrices accumsan risus eget fermentum. Praesent et pretium ligula, a
        semper lacus. Ut consequat pellentesque dapibus. Nullam feugiat tellus
        in gravida commodo. Quisque mattis sapien vel dui accumsan lacinia.
        Proin ac laoreet mi.
      </p>
      <p className="mt-10 mx-auto max-w-3xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique
        iaculis rhoncus. Curabitur laoreet diam et convallis feugiat. Donec
        lectus urna, rutrum a ligula id, finibus sagittis neque. Nullam a purus
        rutrum, venenatis enim ac, rhoncus tortor. Duis ultricies massa vel arcu
        fringilla ullamcorper. Curabitur ullamcorper lacinia libero a fermentum.
        Ut sed ipsum eu sem cursus rutrum. Sed eu purus mi. Nam gravida ante sit
        amet nulla tincidunt luctus. Phasellus eu accumsan lorem. Donec ante
        orci, maximus quis lacus et, malesuada sodales sapien. In facilisis
        dignissim ornare. Pellentesque sollicitudin, dolor nec posuere faucibus,
        quam odio malesuada quam, nec tristique lacus magna id diam. Nulla
        sollicitudin tristique bibendum. Quisque ultricies elementum commodo.
      </p>
    </Block>
    <Block>
      <Gallery />
    </Block>
    <Block title="related" bg={true}>
      <Carousel />
    </Block>
    <div className="px-24 pb-10 bg-bg-lighter-gray">
      <button className="relative">
        <svg
          className="absolute"
          style={{ left: "-40px", top:"7px" }}
          width="28px"
          height="13px"
          viewBox="0 0 28 13"
        >
          <g
            id="Group"
            transform="translate(2.000000, 1.000000)"
            stroke="#000000"
            strokeWidth="2"
          >
            <line x1="25.977" y1="5.599" x2="0" y2="5.599" id="Line_130"></line>
            <polyline
              id="Path_31324"
              points="5.601 0 0.000999999999 5.6 5.601 11.2"
            ></polyline>
          </g>
          ;
        </svg>
        back to artists
      </button>
    </div>
  </>
);

export default SingleArtist;
