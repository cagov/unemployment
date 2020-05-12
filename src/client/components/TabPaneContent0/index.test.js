import renderTransContent from "../../test-helpers/renderTransContent";
import TabPaneContent from "./index";

describe("<TabPaneContent0 />", () => {
  it("renders the TabPaneContent component", async () => {
    const props = {
      getTabLink: jest.fn(),
    };
    const content = renderTransContent(TabPaneContent, props);
    expect(content).toMatchSnapshot();
  });
});
