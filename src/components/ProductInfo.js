import fetchProduct from "./rest-api/fetchProduct";
import AddToCart from "./formsUI/AddToCart";
import parse from "html-react-parser";

export default function ProductInfo({ id = null }) {
  const state = fetchProduct(id);

  return (
    <>
      {!state.loaded ? (
        "loading"
      ) : (
        <div className="flex py-2 flex-col lg:flex-row items-start">
          <div className="w-full mr-3 leading-tight lg:w-1/2 mb-5 lg:mb-auto">
            {state.item?.description
              ? parse(state.item.description)
              : typeof state.item.description === "string"
              ? parse(state.item.description)
              : ""}
          </div>
          <div className="w-full mr-3 leading-tight lg:w-1/2 mb-5 lg:mb-auto">
            <div className="mb-8">
              {state.item?.short_description
                ? parse(state.item.short_description)
                : typeof state.item.short_description === "string"
                ? parse(state.item.short_description)
                : ""}
            </div>
            <div>
              {
                // console.log(state.item)
                console.log(
                  state.item.meta_data.find(
                    (x) => x.key === "_alg_wc_product_open_pricing_enabled"
                  ).value === "yes"
                    ? true
                    : false
                )
              }
              <AddToCart
                productID={id}
                defaultPrice={
                  state.item.meta_data.find(
                    (x) =>
                      x.key === "_alg_wc_product_open_pricing_default_price"
                  ).value
                }
                openPrice={
                  state.item.meta_data.find(
                    (x) => x.key === "_alg_wc_product_open_pricing_enabled"
                  ).value === "yes"
                    ? true
                    : false
                }
                minPrice={
                  state.item.meta_data.find(
                    (x) => x.key === "_alg_wc_product_open_pricing_min_price"
                  ).value
                }
                maxPrice={
                  state.item.meta_data.find(
                    (x) => x.key === "_alg_wc_product_open_pricing_max_price"
                  ).value
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
