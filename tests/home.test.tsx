import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("home page", () => {
  it("renders every look, the default selection and the not-a-store notice", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("hold</i> air.");
    expect(html).toContain("THE CONTACT SHEET / <!-- -->4<!-- --> STUDIES");
    for (const title of ["Soft Architecture", "After the Rain", "Borrowed Light", "Hard Reset"]) expect(html).toContain(title);
    expect(html).toContain("SELECTED STUDY / <!-- -->LOOK 02");
    expect(html).toContain("Not a store / no brand affiliation");
  });
});
