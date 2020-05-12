import renderTransContent from "../../test-helpers/renderTransContent";
import TabPaneContent from "./index";

describe("<TabPaneContent3 />", () => {
  it("renders the TabPaneContent component", async () => {
    const content = renderTransContent(TabPaneContent);
    expect(content).toMatchSnapshot();
  });
});
