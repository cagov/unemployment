const COSMOS_CONFIG = {
  endpoint: getRetrocertEndpoint(),
  key: getRetrocertDbKey(),
  databaseName: "retrocert",
  formsContainerName: "forms",
  usersContainerName: "users",
  partitionKey: { kind: "Hash", paths: ["/category"] },
};

function getRetrocertDbKey() {
  // todo(kalvin): retrieve this key from azure instead of uncommitted .env
  const key = process.env.COSMOS_DB_KEY;

  if (!key) {
    console.error("CosmosDB key is missing");
  }

  return key;
}

function getRetrocertEndpoint() {
  const endpoint = process.env.COSMOS_ENDPOINT;

  if (!endpoint) {
    console.error("CosmosDB endpoint URL is missing");
  }

  return endpoint;
}

module.exports = COSMOS_CONFIG;
