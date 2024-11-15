import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="p-8 lg:p-24 flex flex-col lg:flex-row lg:justify-between bg-bg-darker bg-opacity-45 text-center lg:text-left">
    <div className="">
      <h4 className="text-lg lg:text-2xl border-b-2 border-black mb-2 block lg:inline-block ">
        find us
      </h4>
      <p>
        Willem Dreespark 312
        <br />
        2531 SX, The Hague
      </p>
    </div>
    <div className="">
      <h4 className="mt-5 lg:mt-auto text-lg lg:text-2xl border-b-2 border-black mb-2 block lg:inline-block ">
        contact us
      </h4>
      <p>
        <a
          className="hover:underline"
          href="mailto:info@instrumentinventors.org"
        >
          info@instrumentinventors.org
        </a>
      </p>
    </div>
    <div className="">
      <h4 className="mt-5 lg:mt-auto text-lg lg:text-2xl border-b-2 border-black mb-2 block lg:inline-block ">
        donate
      </h4>
      <p>
        <a
          className="hover:underline"
          href="https://shop.instrumentinventors.org/product/donation/"
          target="_blank"
        >
          click for more info
        </a>
      </p>
    </div>
    <div className="">
      <h4 className="mt-5 lg:mt-auto text-lg lg:text-2xl border-b-2 border-black mb-2 block lg:inline-block ">
        follow us
      </h4>
      <p className="flex justify-center lg:justify-start">
        <a
          href="https://www.facebook.com/instrumentinventors"
          target="_blank"
          className="mr-2 transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            // className="fill-current hover:text-white"
          >
            <path
              d="M-1443.557,1838.041a20,20,0,0,0-20,20,20,20,0,0,0,20,20,20,20,0,0,0,20-20A20,20,0,0,0-1443.557,1838.041Zm5.874,12.133h-2.778c-.981,0-1.185.4-1.185,1.417v2.451h3.964l-.382,4.3h-3.581V1871.2h-5.133v-12.8h-2.67v-4.358h2.67v-3.432c0-3.221,1.722-4.9,5.542-4.9h3.555Z"
              transform="translate(1463.557 -1838.041)"
            />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/instrumentinventors/"
          target="_blank"
          className="mr-2 transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
          >
            <path
              d="M-2374.5,2077.18a3.573,3.573,0,0,0-.865-1.329,3.58,3.58,0,0,0-1.33-.865,6.407,6.407,0,0,0-2.147-.4c-1.219-.056-1.585-.067-4.672-.067s-3.453.011-4.673.067a6.408,6.408,0,0,0-2.147.4,3.572,3.572,0,0,0-1.329.865,3.56,3.56,0,0,0-.865,1.329,6.41,6.41,0,0,0-.4,2.147c-.056,1.219-.067,1.585-.067,4.673s.011,3.453.067,4.672a6.411,6.411,0,0,0,.4,2.147,3.559,3.559,0,0,0,.865,1.329,3.575,3.575,0,0,0,1.329.865,6.415,6.415,0,0,0,2.147.4c1.219.055,1.585.067,4.673.067s3.453-.012,4.672-.067a6.413,6.413,0,0,0,2.147-.4,3.583,3.583,0,0,0,1.33-.865,3.572,3.572,0,0,0,.865-1.329,6.408,6.408,0,0,0,.4-2.147c.056-1.219.067-1.585.067-4.672s-.011-3.454-.067-4.673A6.407,6.407,0,0,0-2374.5,2077.18Zm-9.014,12.757a5.937,5.937,0,0,1-5.938-5.937,5.937,5.937,0,0,1,5.938-5.937,5.937,5.937,0,0,1,5.937,5.938A5.937,5.937,0,0,1-2383.513,2089.937Zm6.172-10.722a1.388,1.388,0,0,1-1.388-1.387,1.388,1.388,0,0,1,1.388-1.388,1.388,1.388,0,0,1,1.387,1.388A1.387,1.387,0,0,1-2377.341,2079.215Z"
              transform="translate(2403.534 -2063.581)"
            />
            <path
              d="M-2267.542,2196.123a3.855,3.855,0,0,0-3.855,3.854,3.855,3.855,0,0,0,3.855,3.854,3.854,3.854,0,0,0,3.854-3.854A3.854,3.854,0,0,0-2267.542,2196.123Z"
              transform="translate(2287.563 -2179.558)"
            />
            <path
              d="M-2600.864,1838.041a20,20,0,0,0-20,20,20,20,0,0,0,20,20,20,20,0,0,0,20-20A20,20,0,0,0-2600.864,1838.041Zm11.514,25.186a8.486,8.486,0,0,1-.537,2.807,5.665,5.665,0,0,1-1.333,2.048,5.658,5.658,0,0,1-2.048,1.334,8.486,8.486,0,0,1-2.807.537c-1.233.057-1.627.07-4.768.07s-3.534-.013-4.767-.07a8.488,8.488,0,0,1-2.807-.537,5.661,5.661,0,0,1-2.048-1.334,5.666,5.666,0,0,1-1.334-2.048,8.468,8.468,0,0,1-.537-2.807c-.057-1.234-.07-1.627-.07-4.767s.013-3.534.07-4.768a8.466,8.466,0,0,1,.537-2.807,5.669,5.669,0,0,1,1.334-2.048,5.657,5.657,0,0,1,2.048-1.334,8.5,8.5,0,0,1,2.807-.538c1.233-.057,1.627-.07,4.767-.07s3.534.013,4.768.07a8.494,8.494,0,0,1,2.807.538,5.655,5.655,0,0,1,2.048,1.334,5.668,5.668,0,0,1,1.333,2.048,8.484,8.484,0,0,1,.537,2.807c.056,1.233.07,1.627.07,4.768S-2589.293,1861.994-2589.35,1863.227Z"
              transform="translate(2620.864 -1838.041)"
            />
          </svg>
        </a>
        <a
          href="https://vimeo.com/user43489698"
          target="_blank"
          className="mr-2 transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="39.998"
            height="39.998"
            viewBox="0 0 39.998 39.998"
          >
            <g transform="translate(1040.576 -677.415)">
              <path d="M-1020.577,677.415a20,20,0,0,0-20,20,20,20,0,0,0,20,20,20,20,0,0,0,20-20A20,20,0,0,0-1020.577,677.415Zm14.138,13.419q-.188,4.133-5.773,11.32-5.771,7.506-9.768,7.506-2.473,0-4.186-4.572-1.142-4.19-2.285-8.38-1.269-4.57-2.726-4.572a8.776,8.776,0,0,0-2.222,1.334l-1.331-1.716q2.093-1.839,4.13-3.685,2.8-2.414,4.195-2.543,3.3-.317,4.068,4.519.825,5.219,1.144,6.49.952,4.33,2.1,4.329.889,0,2.67-2.808a11.081,11.081,0,0,0,1.906-4.275q.253-2.425-1.906-2.426a5.272,5.272,0,0,0-2.1.464q2.086-6.836,7.973-6.647Q-1006.187,685.3-1006.439,690.834Z" />
            </g>
          </svg>
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
