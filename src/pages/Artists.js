import React, { useState, useContext } from "react";
import Block from "../components/layout/Block";
import TileView from "../components/view/TileView";
import ListView from "../components/view/ListView";
import Filter from "../components/Filter";

import ViewContext from '../store/view-context';


const Artists = () => {
  const viewCtx = useContext(ViewContext);

  return (
    <>
      <Filter />

      <Block className='mt-16' >
        {viewCtx.mode=="tile" ? (<TileView />) : (<ListView />)}
      </Block>
    </>
  );
};

export default Artists;
