// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import Home from "@/app/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import nextConfig from "@/next.config";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
const TITLES = ["Soft Architecture", "After the Rain", "Borrowed Light", "Hard Reset"];

describe("home page (server render)", () => {
  it("renders one h1, every look with its facts, and the not-a-store notice", () => {
    const html = renderToString(<Home />);
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain("Clothes hold air.");
    for (const title of TITLES) expect(html).toContain(title);
    expect(html).toContain("compressed felt / lacquered twill");
    expect(html).toContain("Not a store, and no brand affiliation.");
    expect(html).toContain('href="https://bookchaowalit.com/"');
  });
});

describe("home page (mounted)", () => {
  let root: Root;
  let host: HTMLDivElement;
  const button = (text: string) => [...host.querySelectorAll("button")].find((b) => b.textContent?.trim().startsWith(text)) as HTMLButtonElement;
  const press = (el: Element) => act(() => { el.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
  const titles = () => [...host.querySelectorAll(".rs-entry h3")].map((h) => h.textContent);

  beforeEach(() => {
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
    act(() => root.render(<Home />));
  });
  afterEach(() => { act(() => root.unmount()); host.remove(); });

  it("filters by silhouette with a pressed chip and a count", () => {
    expect(titles()).toEqual(TITLES);
    press(button("fluid"));
    expect(titles()).toEqual(["Borrowed Light"]);
    expect(button("fluid").getAttribute("aria-pressed")).toBe("true");
    expect(host.querySelector(".rs-count")!.textContent).toBe("Showing 1 of 4 looks in “fluid”");
    press(button("All"));
    expect(host.querySelector(".rs-count")!.textContent).toBe("4 looks");
  });
});

describe("site files", () => {
  it("points robots and the sitemap at fashion.bookchaowalit.com and redirects /more-projects", async () => {
    expect(robots().sitemap).toBe("https://fashion.bookchaowalit.com/sitemap.xml");
    expect(sitemap()[0].url).toBe("https://fashion.bookchaowalit.com/");
    expect(await nextConfig.redirects!()).toContainEqual({ source: "/more-projects", destination: "https://bookchaowalit.com/", permanent: true });
  });
});
