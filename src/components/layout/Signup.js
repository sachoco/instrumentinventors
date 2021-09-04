import React from "react";
import { Link } from "react-router-dom";

const Signup = () => (
  <div className="p-8 lg:p-24 bg-bg-light-gray">
    <h4 className="text-lg lg:text-2xl mb-4 lg:mb-10 max-w-xs">
      stay updated,
      <br />
      subscribe to our newsletter
    </h4>
    <form className="w-full max-w-4xl">
      <div className="flex py-2 flex-col lg:flex-row">
        <input
          className="appearance-none bg-transparent border-b-2 border-black w-full mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-light lg:max-w-input-name mb-5 lg:mb-auto"
          type="text"
          placeholder="first name"
          aria-label="first name"
        />
        <input
          className="appearance-none bg-transparent border-b-2 border-black w-full mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-light lg:max-w-input-name mb-5 lg:mb-auto"
          type="text"
          placeholder="last name"
          aria-label="last name"
        />
        <input
          className="appearance-none bg-transparent border-b-2 border-black w-full mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-light lg:max-w-input-email mb-5 lg:mb-auto"
          type="email"
          placeholder="email"
          aria-label="email"
        />
        <span className="flex-grow lg:text-right mt-2 lg:mt-auto">
          <button
            className="flex-grow bg-white hover:bg-black hover:text-white border-black border-2 text-black py-1 px-6 font-title"
            type="button"
          >
            subscribe
          </button>
        </span>
      </div>
    </form>
  </div>
);

export default Signup;
