const COSMOS_CONFIG = require("./cosmosConfig");
const CosmosClient = require("@azure/cosmos").CosmosClient;
const { v4: uuidv4 } = require("uuid");
const shajs = require("sha.js");

const {
  endpoint,
  key,
  databaseName,
  formsContainerName,
  usersContainerName,
  partitionKey,
} = COSMOS_CONFIG;

const client = new CosmosClient({ endpoint, key });
/**
 * Create the database if it does not exist
 */
async function createDatabase(databaseId) {
  const { database } = await client.databases.createIfNotExists({
    id: databaseId,
  });
  return database;
}

/**
 * Create the container if it does not exist
 */
async function createContainer(containerId) {
  const { container } = await client
    .database(databaseName)
    .containers.createIfNotExists(
      { id: containerId, partitionKey },
      { offerThroughput: 400 } // this the the minimum on autoscale, see https://azure.microsoft.com/en-us/pricing/details/cosmos-db/
    );
  return container;
}

function getContainer(containerName) {
  const database = client.database(databaseName);
  const container = database.container(containerName);

  return container;
}

async function insertItem(item, containerName) {
  const container = await getContainer(containerName);

  try {
    const { resource: upsertedItem } = await container.items.upsert(item);
    return upsertedItem;
  } catch (error) {
    if (error.code === 409) {
      console.error("An item with this id already exists");
    } else {
      console.error(error);
    }
  }
}

async function createRetroCertDatabaseIfNeeded() {
  try {
    await createDatabase(databaseName);
    await Promise.all([
      createContainer(usersContainerName),
      createContainer(formsContainerName),
    ]);
  } catch (error) {
    console.error(
      "Error when creating retrocert database and containers",
      error
    );
  }
}

async function getUserById(id) {
  const container = await getContainer(usersContainerName);

  const { resources } = await container.items
    .query({
      query: `SELECT * from ${usersContainerName} as u WHERE u.id = @id`,
      parameters: [{ name: "@id", value: id }],
    })
    .fetchAll();
  return resources.length === 1 ? resources[0] : null;
}

async function getUserByNameDobSsn(lastName, dob, ssn) {
  const hashKey = lastName.toLowerCase() + dob + ssn;

  // The hash values from EDD are of UTF-16 LE strings.
  // From https://stackoverflow.com/a/24386744
  const hashKeyUtf16LE = new Uint8Array(hashKey.length * 2);
  for (let i = 0; i < hashKey.length; i++) {
    hashKeyUtf16LE[i * 2] = hashKey.charCodeAt(i); // & 0xff;
    hashKeyUtf16LE[i * 2 + 1] = hashKey.charCodeAt(i) >> 8; // & 0xff;
  }

  const eddId = shajs("sha256").update(hashKeyUtf16LE).digest("hex");
  let user = await getUserById(`0x${eddId.toUpperCase()}`);
  if (!user) {
    // If we don't find the user, try a hash of the bytes as utf8 (for compat with the staging server).
    const oldId = shajs("sha256").update(hashKey).digest("hex");
    user = await getUserById(oldId);
  }

  return user;
}

async function getFormDataByAuthToken(authToken) {
  const container = await getContainer(formsContainerName);

  const { resources } = await container.items
    .query({
      query: `SELECT * from ${formsContainerName} as f WHERE f.authToken = @authToken`,
      parameters: [{ name: "@authToken", value: authToken }],
    })
    .fetchAll();
  return resources.length === 1 ? resources[0] : null;
}

async function getFormDataByUserId(userId) {
  const container = await getContainer(formsContainerName);

  const { resources } = await container.items
    .query({
      query: `SELECT * from ${formsContainerName} as f WHERE f.id = @userId`,
      parameters: [{ name: "@userId", value: userId }],
    })
    .fetchAll();
  return resources.length === 1 ? resources[0] : null;
}

async function getFormDataByUserIdWithNewAuthToken(userId) {
  const item = (await getFormDataByUserId(userId)) || {};
  item.id = userId;
  item.authToken = uuidv4();
  await insertItem(item, formsContainerName);
  return item;
}

async function saveFormData(authToken, formData) {
  const item = await getFormDataByAuthToken(authToken);

  if (!item) {
    return;
  }

  item.formData = formData;
  item.confirmationNumber = uuidv4();
  await insertItem(item, formsContainerName);
  return item;
}

module.exports = {
  createRetroCertDatabaseIfNeeded,
  getFormDataByAuthToken,
  getUserByNameDobSsn,
  getUserById,
  getFormDataByUserIdWithNewAuthToken,
  saveFormData,
};
