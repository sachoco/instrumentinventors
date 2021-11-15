import { useLocation } from "react-router-dom";
import normalizePosttype from "./normalizePosttype";

const getTitle = (item) => {
  const location = useLocation();
  console.log(location);

  let title = "";
  if(location.pathname=="/"){
    title = "home";
  }else if(location.pathname=="/artists/"){
    title = "artists";
  }else if(location.pathname=="/hosted/"){
    title = "hosted program";
  }else if(location.pathname=="/agency/"){
    title = "agency";
  }else if(location.pathname=="/education/"){
    title = "education";
  }else if(location.pathname=="/projects/"){
    title = "projects";
  }else if(location.pathname=="/agenda/"){
    title = "agenda";
  }
  if(item){
    const { title: posttitle, posttype } = normalizePosttype(item);
    console.log(posttitle+" : "+posttype);
    title = posttitle;
  }
  return title;

};

export default getTitle;
