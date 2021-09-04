import React from "react";

export default function Block(props) {

  return (
    <div className={"px-8 py-10 lg:p-24 " + (props.bg ? 'bg-bg-lighter-gray ' : '') + (props.className)}>
      {props.title && (<h4 className="text-lg lg:text-2xl mb-4 lg:mb-10">{props.title}</h4>)}
      {props.children}
    </div>
  );
}
