import React from "react";
import { Helmet } from "react-helmet";

export default function Meta({title}) {

  return (
    <Helmet titleTemplate="%s | Instrument Inventors">
      <title>{title}</title>
    </Helmet>
  );
}
