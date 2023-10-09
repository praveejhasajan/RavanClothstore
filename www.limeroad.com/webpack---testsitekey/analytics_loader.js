import siteConfig from "./temp/config.js";
const metadata = require(`./temp/metadata.json`);
try {
  require(`./temp/custom.js`);
} catch (error) {
  console.log(error);
}

const version = metadata.sdkVersion;
window.UnxAnalyticsConfig = siteConfig;
// Analytics code SDK needs metaData object within UnxAnalyticsConfig to determine UnbxdSiteName
window.UnxAnalyticsConfig.metaData = {
  siteName: metadata.siteName,
};
const scriptEl = document.createElement("script");
scriptEl.src = `https://libraries.unbxdapi.com/ua/${version}/uaLibrary.js`;
document.head.appendChild(scriptEl);
