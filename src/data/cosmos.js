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

  const hashId = shajs("sha256").update(hashKey).digest("hex");
  const user = await getUserById(`0x${hashId.toUpperCase()}`);

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

  // If the user already submitted data, don't overwrite it.
  if (!item.confirmationNumber) {
    item.formData = formData;
    item.confirmationNumber = uuidv4();
    await insertItem(item, formsContainerName);
  }

  return { confirmationNumber: item.confirmationNumber };
}

module.exports = {
  createRetroCertDatabaseIfNeeded,
  getFormDataByAuthToken,
  getUserByNameDobSsn,
  getUserById,
  getFormDataByUserIdWithNewAuthToken,
  saveFormData,
};
