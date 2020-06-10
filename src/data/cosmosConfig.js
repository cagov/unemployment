const { COSMOS_STAGING_DB_KEY } = require("../../local.config.js");

const COSMOS_CONFIG = {
  endpoint: "https://cdbbnscnd001.documents.azure.com:443/",
  key: getRetrocertDbKey(),
  databaseName: "retrocert",
  formsContainerName: "forms",
  usersContainerName: "users",
  partitionKey: { kind: "Hash", paths: ["/category"] },
};

function getRetrocertDbKey() {
  const key = process.env.COSMOS_DB_KEY || COSMOS_STAGING_DB_KEY;
  if (!key) {
    console.error("CosmosDB key is missing");
  }
  return key;
}

module.exports = COSMOS_CONFIG;
