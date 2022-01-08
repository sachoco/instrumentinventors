import he from "he";
import parse from "html-react-parser";
import NoImage from "../../assets/no-image.svg";
import { useCookies } from "react-cookie";

const normalizePosttype = (item) => {
  const [cookies, setCookie] = useCookies(["lang"]);

  let returnObj = {
    title: "",
    content: "",
    image: {},
    link: "",
    tag: he.decode("&nbsp;"),
    subcategory: [],
    archive_base: "",
    subcat_link: "",
    date: "",
    website: "",
    meta1: he.decode("&nbsp;"),
    meta2: he.decode("&nbsp;"),
    meta3: he.decode("&nbsp;"),
    posttype: "",
  };
  if (
    !(
      typeof item === "undefined" ||
      (Object.keys(item).length === 0 && item.constructor === Object)
    )
  ) {
    if (item.search_result || item.related_result) {
      returnObj.title = he.decode(item.title);
      returnObj.image = item.featured_image
        ? { medium: item.featured_image, large: item.featured_image }
        : { medium: NoImage, large: NoImage };
      returnObj.link =
        "/" +
        item.url
        .replace("http://", "")
        .replace("https://", "")
        .split(/[/?#](.+)/)[1];
      returnObj.subcategory = item.subtype;
      returnObj.tag = item.tags?.length > 0 ? item.tags : "no tag yet";
      returnObj.posttype = item.subtype;
    } else if (item.featured_result) {
      returnObj.title = he.decode(item.title);
      returnObj.image = item.featured_image
        ? { medium: item.featured_image, large: item.featured_image }
        : { medium: NoImage, large: NoImage };
      returnObj.link =
        "/" +
        item.url
          .replace("http://", "")
          .replace("https://", "")
          .split(/[/?#](.+)/)[1];
      returnObj.tag = item.tags?.length > 0 ? item.tags : "no tag yet";
      returnObj.posttype = item.post_type;
      returnObj.date = item.date;
      returnObj.meta1 = item.meta1 ? item.meta1 : "";
      returnObj.meta2 = item.meta2 ? item.meta2 : "";
      returnObj.meta3 = item.meta3 ? item.meta3 : "";
      returnObj.subcategory = item.subcategory;
      returnObj.archive_base = item.archive_base;

    } else {
      // if (cookies.lang == "nl"&&item.wpml_translations.nl_NL) {
      //   returnObj.title = item.wpml_translations.nl_NL.post_title;
      // }else{
      //   returnObj.title = item.title.rendered
      //   ? he.decode(item.title.rendered)
      //   : he.decode(item.title);
      // }
      returnObj.title = item.title.rendered
      ? he.decode(item.title.rendered)
      : he.decode(item.title);
      
      if(item.content){
        returnObj.content = item.content.rendered 
        ? parse(item.content.rendered)
        : parse(item.content)
      }

      returnObj.image = item.iii?.featured_image
      ? {
          full: item.iii.featured_image.full
            ? item.iii.featured_image.full
            : NoImage,
          large: item.iii.featured_image.large
          ? item.iii.featured_image.large
          : NoImage,
          medium: item.iii.featured_image.medium
          ? item.iii.featured_image.medium
          : NoImage,
        }
      : {
          full: NoImage,
          large: NoImage,
          medium: NoImage,
        };
      returnObj.link = "/" + item.type + "/" + item.slug;
      returnObj.posttype = item.type;
      returnObj.tag = (Array.isArray(item.iii.tags)&&item.iii.tags?.length > 0) ? item.iii.tags : "no tag yet";

      if (item.type == "artist") {
        returnObj.subcategory = item.acf.badges;
        // if (returnObj.subcategory.value == "resident") {
        if (item.acf.date_from) {
            returnObj.date = item.acf.date_until
            ? `${item.acf.date_from} - ${item.acf.date_until}`
            : `${item.acf.date_from} - ongoing`;
        }
        returnObj.website = item.acf.website && item.acf.website;
        returnObj.archive_base = "artists";

      } else if (item.type == "project") {
        returnObj.subcategory = [item.acf.category];
        returnObj.meta1 = item.acf.authors ? item.acf.authors : "no authors value";
        returnObj.meta2 = item.acf.year ? item.acf.year : "no year value";
        returnObj.date = item.acf.year;
        returnObj.archive_base = "projects";

      } else if (item.type == "agenda") {
        returnObj.subcategory = [item.acf.category];
        returnObj.date = item.acf.date_until
          ? `${item.acf.date_from} - ${item.acf.date_until}`
          : `${item.acf.date_from}`;

        let location = "";
        if(!item.acf.venue&&!item.acf.city){
          if(item.acf.location){
            location = item.acf.location[0].location;
          }
        }else if(item.acf.venue&&item.acf.city){
          location = item.acf.venue + ", " + item.acf.city;
        }else{
          location = item.acf.venue + item.acf.city;
        }
        returnObj.meta1 = location;//item.acf.venue ? item.acf.venue : "no venue value";
        // returnObj.meta2 = item.acf.city ? item.acf.city : "no city value";
        returnObj.meta3 = item.acf["host_|_circulation"];
        returnObj.archive_base = "agenda";

      } else {

        returnObj.subcategory =
        item.iii?.category
          ? item.iii.category.map((cat) => {
              return { value: cat.id, label: he.decode(cat.name) };
            })
          : null;
        // returnObj.date = item.formatted_date;
        returnObj.date = new Date(item.date).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"long"});
        returnObj.archive_base = "posts";
      }
    }
    // console.log(returnObj)
  }
  return returnObj;
};

export default normalizePosttype;
