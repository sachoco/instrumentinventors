import he from "he";
import parse from "html-react-parser";
import NoImage from "../../assets/no-image.svg";
import { useCookies } from "react-cookie";
import moment from "moment";
import "moment-timezone";

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join(".");
}
function convertDateForIos(date) {
  var arr = date.split(/[- :]/);
  if(arr[3]){
    date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
  }else{
    date = new Date(arr[0], arr[1]-1, arr[2]);
  }
  // console.log(date);
  return date;
}
function parseTwoDates(date_from, date_until) {
  const yearDiff = date_until.year() - date_from.year();//date_from.diff(date_until, "year");
  const monthDiff = date_until.month() - date_from.month();///date_from.diff(date_until, "month");
  // console.log(monthDiff);
  const dayDiff = date_from.diff(date_until, "day");
  if (yearDiff != 0) {
    return (
      date_from.format("DD.MM.YYYY") + " - " + date_until.format("DD.MM.YYYY")
    );
  } else if (monthDiff != 0) {
    return date_from.format("DD.MM") + " - " + date_until.format("DD.MM.YYYY");
  } else {
    return date_from.format("DD") + "-" + date_until.format("DD.MM.YYYY");
  }
}

const normalizePosttype = (item) => {
  const [cookies, setCookie] = useCookies(["lang"]);

  let returnObj = {
    title: "",
    content: "",
    excerpt: "",
    image: {},
    link: "",
    tag: he.decode("&nbsp;"),
    artists: he.decode("&nbsp;"),
    subcategory: [],
    archive_base: "",
    subcat_link: "",
    date: "",
    full_date: "",
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
      returnObj.tag = item.tags ? item.tags : he.decode("&nbsp;"); //?.length > 0 ? item.tags : "";
      returnObj.artists = item.artists ? item.artists : he.decode("&nbsp;"); //?.length > 0 ? item.tags : "";
      returnObj.posttype = item.subtype;
      if (item.subtype == "artist") {
        returnObj.subcategory = item.acf?.badges;

        // returnObj.meta1 = item.acf?.badges
        //   ? item.acf.badges.map((obj) => obj.label).join(", ")
        //   : null;
        let date_from = "";
        let date_until = "";
        if (
          returnObj.subcategory?.some(function (badge, index) {
            if (badge.value == "resident") return true;
          }) &&
          !returnObj.subcategory?.some(function (badge, index) {
            if (badge.value == "iii_member") return true;
          })
        ) {
          date_from = item.acf.date_from
            ? moment(item.acf.date_from, "DD.MM.YYYY").format("MM.YYYY")
            : "";
          date_until = item.acf.date_until
            ? moment(item.acf.date_until, "DD.MM.YYYY").format("MM.YYYY")
            : "";
        } else {
          date_from = item.acf.date_from
            ? moment(item.acf.date_from, "DD.MM.YYYY").year()
            : "";
          date_until = item.acf.date_until
            ? moment(item.acf.date_until, "DD.MM.YYYY").year()
            : "";
        }
        if (date_from) {
          returnObj.date = date_until
            ? date_from == date_until
              ? `${date_from}`
              : `${date_from} - ${date_until}`
            : `${date_from} - ongoing`;
          returnObj.full_date = item.acf.date_until
            ? item.acf.date_from == item.acf.date_until
              ? `${item.acf.date_from}`
              : `${item.acf.date_from} - ${item.acf.date_until}`
            : `${item.acf.date_from} - ongoing`;
        } else {
          returnObj.date = null;
        }
        returnObj.website = item.acf.website && item.acf.website;
        returnObj.archive_base = "artists";
      } else if (item.subtype == "project") {
        // returnObj.meta1 = item.acf.category ? item.acf.category.map((obj)=>(obj.label)).join(', ') : null;
        returnObj.subcategory = item.acf.category ? [item.acf.category] : null;
        // returnObj.meta1 = item.acf.category ? item.acf.category.label : null;
        returnObj.meta1 = item.acf.authors
          ? item.acf.authors
          : he.decode("&nbsp;");
        if (item.acf.year) {
          returnObj.date =
            item.acf.year == item.acf.year_end
              ? `${item.acf.year}`
              : `${item.acf.year} - ${item.acf.year_end}`;
        }
        returnObj.archive_base = "projects";
      } else if (item.subtype == "agenda") {
        returnObj.subcategory = item.acf.category ? [item.acf.category] : null;
        item.acf.date_from
          ? (returnObj.date = item.acf.date_until
              ? parseTwoDates(
                  moment(item.acf.date_from, "DD.MM.YYYY"),
                  moment(item.acf.date_until, "DD.MM.YYYY")
                )
              : `${item.acf.date_from}`)
          : (returnObj.date = "");

        let location = null;
        if (!item.acf.venue && !item.acf.city) {
          if (item.acf.location) {
            location = item.acf.location[0].location;
          }
        } else if (item.acf.venue && item.acf.city) {
          location = item.acf.venue + ", " + item.acf.city;
        } else {
          location = item.acf.venue + item.acf.city;
        }
        if (location) {
          returnObj.meta1 = location; //item.acf.venue ? item.acf.venue : "no venue value";
        }
        returnObj.meta3 = item.acf["host_|_circulation"];
        returnObj.archive_base = "agenda";
      } else {
        returnObj.subcategory = item.category
          ? item.category.map((cat) => {
              return { value: cat.id, label: he.decode(cat.name) };
            })
          : null;
        // returnObj.meta1 = item.iii?.category
        //   ? item.iii.category.map((cat) => cat.name).join(", ")
        //   : null;
        // returnObj.date = item.formatted_date;
        // returnObj.date = new Date(item.date).toLocaleDateString("en-us", {
        //   day: "numeric",
        //   year: "numeric",
        //   month: "long",
        // });

        returnObj.date = formatDate(new Date(convertDateForIos(item.date)));
        // returnObj.subcategory = "news & media";
        returnObj.archive_base = "posts";
      }
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
      returnObj.tag = item.tags?.length > 0 ? item.tags : "";
      returnObj.artists = item.artists?.length > 0 ? item.artists : "";
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
      returnObj.title = item.title?.rendered
        ? he.decode(item.title.rendered)
        : he.decode(item.title);

      if (item.content) {
        returnObj.content = item.content?.rendered
          ? parse(item.content.rendered)
          : typeof item.content === 'string'
          ? parse(item.content)
          : "";
      }
      if (item.excerpt) {
        returnObj.excerpt = item.content?.rendered
          ? parse(item.excerpt.rendered)
          : typeof item.excerpt === 'string'
          ? parse(item.excerpt)
          : "";
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
      returnObj.tag =
        Array.isArray(item.iii?.tags) && item.iii.tags?.length > 0
          ? item.iii.tags
          : he.decode("&nbsp;");
      returnObj.artists =
        Array.isArray(item.iii?.artists) && item.iii.artists?.length > 0
          ? item.iii.artists
          : he.decode("&nbsp;");

      if (item.type == "artist") {
        returnObj.subcategory = item.acf?.badges;
        let date_from = "";
        let date_until = "";
        if (
          returnObj.subcategory?.some(function (badge, index) {
            if (badge.value == "resident") return true;
          }) &&
          !returnObj.subcategory?.some(function (badge, index) {
            if (badge.value == "iii_member") return true;
          })
        ) {
          date_from = item.acf.date_from
            ? moment(item.acf.date_from, "DD.MM.YYYY").format("MM.YYYY")
            : "";
          date_until = item.acf.date_until
            ? moment(item.acf.date_until, "DD.MM.YYYY").format("MM.YYYY")
            : "";
        } else {
          date_from = item.acf.date_from
            ? moment(item.acf.date_from, "DD.MM.YYYY").year()
            : "";
          date_until = item.acf.date_until
            ? moment(item.acf.date_until, "DD.MM.YYYY").year()
            : "";
        }
        if (date_from) {
          returnObj.date = date_until
            ? date_from == date_until
              ? `${date_from}`
              : `${date_from} - ${date_until}`
            : `${date_from} - ongoing`;
          returnObj.full_date = item.acf.date_until
            ? item.acf.date_from == item.acf.date_until
              ? `${item.acf.date_from}`
              : `${item.acf.date_from} - ${item.acf.date_until}`
            : `${item.acf.date_from} - ongoing`;
        } else {
          returnObj.date = null;
        }
        returnObj.website = item.acf.website && item.acf.website;
        returnObj.archive_base = "artists";
      } else if (item.type == "project") {
        returnObj.subcategory = item.acf.category ? [item.acf.category] : null;
        returnObj.meta1 = item.acf.authors
          ? item.acf.authors
          : he.decode("&nbsp;");
        // returnObj.meta2 = item.acf.year ? item.acf.year : "";
        if (item.acf.year) {
          returnObj.date =
            item.acf.year == item.acf.year_end
              ? `${item.acf.year}`
              : `${item.acf.year} - ${item.acf.year_end}`;
          returnObj.full_date = returnObj.date;
        }
        // returnObj.date = item.acf.year;
        returnObj.archive_base = "projects";
      } else if (item.type == "agenda") {
        returnObj.subcategory = item.acf.category ? [item.acf.category] : null;
        returnObj.date = item.acf.date_until
          ? parseTwoDates(
              moment(item.acf.date_from, "DD.MM.YYYY"),
              moment(item.acf.date_until, "DD.MM.YYYY")
            )
          : `${item.acf.date_from}`;
        returnObj.full_date = item.acf.date_until
          ? `${item.acf.date_from} - ${item.acf.date_until}`
          : `${item.acf.date_from}`;
        let location = null;
        if (!item.acf.venue && !item.acf.city) {
          if (item.acf.location) {
            location = item.acf.location[0].location;
          }
        } else if (item.acf.venue && item.acf.city) {
          location = item.acf.venue + ", " + item.acf.city;
        } else {
          location = item.acf.venue + item.acf.city;
        }
        if (location) {
          returnObj.meta1 = location; //item.acf.venue ? item.acf.venue : "no venue value";
        }
        // returnObj.meta2 = item.acf.city ? item.acf.city : "no city value";
        returnObj.meta3 = item.acf["host_|_circulation"];
        returnObj.archive_base = "agenda";
      } else {
        returnObj.subcategory = item.iii?.category
          ? item.iii.category.map((cat) => {
              return { value: cat.id, label: he.decode(cat.name) };
            })
          : null;
        // returnObj.date = item.formatted_date;
        // returnObj.date = new Date(item.date).toLocaleDateString("en-us", {
        //   day: "numeric",
        //   year: "numeric",
        //   month: "long",
        // });
        returnObj.date = formatDate(new Date(item.date));

        returnObj.archive_base = "posts";
      }
    }
    console.log(returnObj)
  }
  return returnObj;
};

export default normalizePosttype;
