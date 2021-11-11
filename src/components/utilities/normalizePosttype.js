import he from "he";
import parse from "html-react-parser";
import NoImage from "../../assets/no-image.svg";

const normalizePosttype = (item) => {
  let returnObj = {
    title: "",
    content: "",
    image: {},
    link: "",
    tag: "",
    subcategory: "",
    date: "",
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
      item.search_result
        ? (returnObj.link = item.url
            .replace("http://", "")
            .replace("https://", "")
            .split(/[/?#]/)[1])
        : (returnObj.link =
            "/" +
            item.url
              .replace("http://", "")
              .replace("https://", "")
              .split(/[/?#](.+)/)[1]);
      returnObj.subcategory = item.subtype;
      returnObj.tag = "tag, tag, tag";
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
      returnObj.tag = item.tag;
      returnObj.posttype = item.posttype;
      returnObj.date = item.date;
      returnObj.meta1 = item.meta1;
      returnObj.meta2 = item.meta2;
      returnObj.meta3 = item.meta3;
    } else {
      returnObj.title = item.title.rendered
        ? he.decode(item.title.rendered)
        : he.decode(item.title);
      returnObj.content = item.content && parse(item.content.rendered);
      returnObj.image = item._embedded
        ? {
            full: item._embedded["wp:featuredmedia"]
              ? item._embedded["wp:featuredmedia"][0].media_details?.sizes.full
                  ?.source_url
              : NoImage,
            large: item._embedded["wp:featuredmedia"]
              ? item._embedded["wp:featuredmedia"][0].media_details?.sizes.large
                  ?.source_url
              : NoImage,
            medium: item._embedded["wp:featuredmedia"]
              ? item._embedded["wp:featuredmedia"][0].media_details?.sizes
                  .medium_large?.source_url
              : NoImage,
          }
        : {
            full: NoImage,
            large: NoImage,
            medium: NoImage,
          };
      returnObj.link = "/" + item.type + "/" + item.slug;
      returnObj.posttype = item.type;
      returnObj.tag = "tag, tag, tag";

      if (item.type == "artist") {
        returnObj.subcategory = item.acf.badges ? item.acf.badges[0] : "";
        if (returnObj.subcategory == "resident") {
          returnObj.date = item.acf.date_until
            ? `${item.acf.date_from} - ${item.acf.date_until}`
            : `${item.acf.date_from}`;
        }
      } else if (item.type == "project") {
        returnObj.subcategory = item.acf.category ? item.acf.category : "";
        returnObj.meta1 = "author";
        returnObj.date = item.acf.year;
      } else if (item.type == "agenda") {
        returnObj.subcategory = item.acf.category ? item.acf.category : "";
        returnObj.date = item.acf.date_until
          ? `${item.acf.date_from} - ${item.acf.date_until}`
          : `${item.acf.date_from}`;
        returnObj.meta1 = item.acf.venue ? item.acf.venue : "venue";
        returnObj.meta2 = item.acf.city ? item.acf.city : "city";
        returnObj.meta3 = item.acf["host_|_circulation"];
      } else {
        returnObj.subcategory =
          item._embedded && item._embedded["wp:term"]
            ? item._embedded["wp:term"][0][0].name
            : "---";
        returnObj.date = item.formatted_date;
      }
    }
  }
  return returnObj;
};

export default normalizePosttype;
