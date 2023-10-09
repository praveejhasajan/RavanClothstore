const limeRoadProd = {
  search: {
    inputBox: "#srcInpu",
    queryBtn: ".srcInpuSub",
  },
  productClickGrid: {
    productElemWrapper: ".an-zeroResult .prdC",
    pidSelector: ".an-zeroResult .prdC [data-prod-id]",
    productPidAttr: "data-prod-id",
    source: "PRODUCT_CLICK_GRID",
  },
  // AddToCartFromPDP & AddToCartFromCartPage are owned by the client using API approach
  // order event is owned by client and is triggered on order-success page
  pageView: {
    delay: 1500,
    events: {
      home: {
        urlIdentifiers: {
          urls: ["https://www.limeroad.com/"],
          exactMatch: true,
        },
      },
      search: {
        uniqueSelectors: {
          selectors: ["[data-page='products_searchfromsolrLR']"],
        },
        urlIdentifiers: {
          urls: ["/search"],
          exactMatch: false,
        },
        searchRecall: {
          noOfResultsSelector: '[class*="zeroResult"] .dTc.vT.fs13',
          getSRCountCB: function (str) {
            const match = str.match(/(\d+)/);
            const number = match ? match[0] : null;
            return number;
          },
        },
      },
      productDisplay: {
        uniqueSelectors: {
          selectors: ["[data-page='vip_showLR']"],
        },
      },
      cart: {
        uniqueSelectors: {
          selectors: ["[data-page='shopping_cart_showLR']"],
        },
        urlIdentifiers: {
          urls: ["/shopping_cart"],
          exactMatch: false,
        },
      },
    },
  },
};

export default limeRoadProd;
