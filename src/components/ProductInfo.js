import React from "react";
import fetchProduct from "./rest-api/fetchProduct";
import fetchVariations from "./rest-api/fetchVariations";

import AddToCart from "./formsUI/AddToCart";
import moment from "moment";
import "moment-timezone";

function parseTwoDates(date_from, date_until) {
  const yearDiff = date_until.year() - date_from.year(); //date_from.diff(date_until, "year");
  const monthDiff = date_until.month() - date_from.month(); ///date_from.diff(date_until, "month");
  console.log(monthDiff);
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

export default function ProductInfo({ item = null, id = null }) {
  const state = fetchProduct(id);
  const variationsState = fetchVariations(id);

  let returnObj = {
    date: "",
  };
  return (
    <>
      <div className="flex py-2 flex-col lg:flex-row items-start">
        {item?.type != "project" && (
          <div className="w-full mr-3 leading-tight lg:w-1/2 mb-5 lg:mb-auto">
            {item?.acf?.date_from && (
              <div className="mb-1">
                Date:{" "}
                {item?.acf?.date_from
                  ? (returnObj.date = item.acf.date_until
                      ? parseTwoDates(
                          moment(item.acf.date_from, "DD.MM.YYYY"),
                          moment(item.acf.date_until, "DD.MM.YYYY")
                        )
                      : `${item.acf.date_from}`)
                  : (returnObj.date = "")}
              </div>
            )}
            {item?.acf?.door_open && (
              <div className="mb-1">Doors: {item?.acf?.door_open}</div>
            )}
            {item?.acf?.time && (
              <div className="mb-1">Event time: {item?.acf?.time}</div>
            )}
            {item?.acf?.venue && (
              <div className="mb-1">Location: {item?.acf?.venue}</div>
            )}
            {item?.acf?.city && (
              <div className="mb-1">City: {item?.acf?.city}</div>
            )}
          </div>
        )}
        <div
          className={`w-full mr-3 leading-tight mb-5 lg:mb-auto ${
            item?.type != "project" ? "lg:w-1/2  " : " "
          }`}
        >
          {!state.loaded || !variationsState.loaded ? (
            <div className="h-16 min-w-16 sm:min-w-20 mr-6">
              <div className="h-full flex flex-col justify-center items-center">
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
                </div>
                <div className="mt-3 text-xs inline-block">loading...</div>
              </div>
            </div>
          ) : (
            <div>
              {state?.item?.meta_data?.find(
                (x) => x.key === "_alg_wc_product_open_pricing_enabled"
              ).value === "yes" ? (
                <AddToCart
                  productID={id}
                  defaultPrice={
                    state?.item?.meta_data?.find(
                      (x) =>
                        x.key === "_alg_wc_product_open_pricing_default_price"
                    ).value
                  }
                  openPrice={true}
                  minPrice={
                    state?.item?.meta_data?.find(
                      (x) => x.key === "_alg_wc_product_open_pricing_min_price"
                    ).value
                  }
                  maxPrice={
                    state?.item?.meta_data?.find(
                      (x) => x.key === "_alg_wc_product_open_pricing_max_price"
                    ).value
                  }
                  soldOut={!state.item.stock_quantity > 0}
                  type={item?.type}
                />
              ) : state?.item?.type == "variable" ? (
                <AddToCart
                  productID={id}
                  defaultPrice="--"
                  variablePrice={state?.item?.variations}
                  variations={variationsState.items}
                  soldOut={!state.item.stock_quantity > 0}
                  type={item?.type}
                />
              ) : (
                <AddToCart
                  productID={id}
                  defaultPrice={state?.item?.price}
                  soldOut={!state.item.stock_quantity > 0}
                  type={item?.type}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
