const COSMOS_CONFIG = require("./cosmosConfig");
const CosmosClient = require("@azure/cosmos").CosmosClient;

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
      { offerThroughput: 400 }
    );
  return container;
}

function getContainer(containerName) {
  const database = client.database(databaseName);
  const container = database.container(containerName);

  return container;
}

async function createItem(item, containerName) {
  const container = await getContainer(containerName);

  try {
    const { resource: createdItem } = await container.items.create(item);
    return createdItem;
  } catch (error) {
    if (error.code === 409) {
      console.log("An item with this id already exists");
    } else {
      console.log(error);
    }
  }
}

async function createRetroCertDatabaseIfNeeded() {
  try {
    await createDatabase(databaseName);
    await createContainer(usersContainerName);
    await createContainer(formsContainerName);
  } catch (error) {
    console.log("Error when creating retrocert database and containers", error);
  }
}

// This is a working example of a parametrized query
// Returns an array of all matching items
async function getUsersByEddcanId(eddcanId) {
  const container = await getContainer(usersContainerName);

  const { resources } = await container.items
    .query({
      query: `SELECT * from ${usersContainerName} as u WHERE u.eddcanId = @eddcanId`,
      parameters: [{ name: "@eddcanId", value: eddcanId }],
    })
    .fetchAll();
  return resources;
}

function createForm(item) {
  return createItem(item, formsContainerName);
}

module.exports = {
  createRetroCertDatabaseIfNeeded,
  createForm,
  getUsersByEddcanId,
};
