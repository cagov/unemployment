import renderTransContent from "../../test-helpers/renderTransContent";
import CertificationExplanationContent from "./index";

describe("<CertificationExplanationContent />", () => {
  it("renders the component", async () => {
    const content = renderTransContent(CertificationExplanationContent);
    expect(content).toMatchSnapshot();
  });
});
