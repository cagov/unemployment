import "dotenv/config";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";

// Setup Enzyme for React component tests
Enzyme.configure({ adapter: new Adapter() });

// Mock manifest files, which are generated as part of the build process
jest.mock(
  "./src/data/manifest-scripts.json",
  () => ({
    client: {
      js: "/mocked-client.js",
    },
  }),
  { virtual: true }
);
jest.mock(
  "./src/data/manifest-styles.json",
  () => ({
    "App.css": "mocked-app.css",
  }),
  { virtual: true }
);

// Google's test environment secret
process.env.RECAPTCHA_SECRET = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";
process.env.COSMOS_DB_KEY = "mock-cosmos-db-key";

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");

  return {
    ...actual,
    useHistory: () => ({
      push: jest.fn(),
      listen: jest.fn(),
    }),
  };
});

jest.mock("uuid", () => {
  const actual = jest.requireActual("uuid");
  return {
    ...actual,
    v4: () => "00000000-fake-mock-fake-123456789012",
  };
});
