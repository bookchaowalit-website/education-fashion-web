import { describe, expect, it } from "vitest";
import { filterLooks, looks, nextLookId, pickSelected, silhouettes } from "@/lib/lookbook";

describe("lookbook data", () => {
  it("has four self-authored looks with unique ids and three colours each", () => {
    expect(looks).toHaveLength(4);
    expect(new Set(looks.map((l) => l.id)).size).toBe(4);
    for (const look of looks) expect(look.colors).toHaveLength(3);
  });

  it("derives the silhouette filters from the data, starting with all", () => {
    expect(silhouettes).toEqual(["all", "sculptural", "longline", "fluid", "tailored"]);
  });
});

describe("filterLooks", () => {
  it("returns every look for all and only matching looks otherwise", () => {
    expect(filterLooks(looks, "all")).toHaveLength(4);
    expect(filterLooks(looks, "fluid").map((l) => l.id)).toEqual(["LOOK 03"]);
    expect(filterLooks(looks, "nope")).toEqual([]);
  });
});

describe("pickSelected", () => {
  it("keeps the chosen look when it is visible", () => {
    expect(pickSelected(looks, "LOOK 02")?.id).toBe("LOOK 02");
  });

  it("opens the first visible look when the filter hides the chosen one", () => {
    // Regression: the detail panel kept showing a look the filter had hidden.
    expect(pickSelected(filterLooks(looks, "tailored"), "LOOK 02")?.id).toBe("LOOK 04");
  });

  it("is undefined when nothing is visible", () => {
    expect(pickSelected([], "LOOK 01")).toBeUndefined();
  });
});

describe("nextLookId", () => {
  it("steps through the looks and wraps at the end", () => {
    expect(nextLookId(looks, "LOOK 01")).toBe("LOOK 02");
    expect(nextLookId(looks, "LOOK 04")).toBe("LOOK 01");
  });

  it("stays inside the filtered set", () => {
    // Regression: "Next study" with the longline filter jumped to LOOK 03, which the filter hides.
    expect(nextLookId(filterLooks(looks, "longline"), "LOOK 02")).toBe("LOOK 02");
  });

  it("is undefined for an empty set", () => {
    expect(nextLookId([], "LOOK 01")).toBeUndefined();
  });
});
