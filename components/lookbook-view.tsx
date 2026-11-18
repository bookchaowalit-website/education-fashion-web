"use client";

import { useState } from "react";
import { EmptyState, Reader, ReaderFoot, ReaderHead, ReaderTop, ResultCount } from "@/components/reader-shell";
import { filterLooks, looks, silhouettes } from "@/lib/lookbook";

// The lookbook on the Reader shell: every look is a card with its colour study, note and facts, so nothing
// changes off-screen when a look is chosen; silhouette chips narrow the contact sheet.

const SOURCE = "https://github.com/bookchaowalit-website/education-fashion-web";

export function LookbookView() {
  const [filter, setFilter] = useState("all");
  const visible = filterLooks(looks, filter);
  return (
    <Reader>
      <ReaderTop name="Lookbook" tagline="Studio studies 2026" links={[{ href: "#looks", label: "Looks" }]} />
      <main id="main" className="rs-main">
        <ReaderHead
          eyebrow="An editorial study in form and surface"
          title="Clothes hold air."
          lede="A contact sheet of self-authored looks, built around the space between a body and the room it enters."
        />
        <section aria-labelledby="looks">
          <div className="rs-section-head"><h2 id="looks">The contact sheet</h2></div>
          <div className="rs-toolbar">
            <ul className="site-chips" aria-label="Filter by silhouette">
              {silhouettes.map((item) => (
                <li key={item}>
                  <button type="button" className="rs-chip" aria-pressed={filter === item} onClick={() => setFilter(item)}>
                    {item === "all" ? "All" : item}<small>{filterLooks(looks, item).length}</small>
                  </button>
                </li>
              ))}
            </ul>
            <ResultCount shown={visible.length} total={looks.length} noun="look" filter={filter === "all" ? undefined : `“${filter}”`} />
          </div>
          {visible.length === 0 ? (
            <EmptyState title="No looks in this silhouette" headingLevel={3} action={<button type="button" className="rs-plain" onClick={() => setFilter("all")}>Show all looks</button>} />
          ) : (
            <ul className="rs-list look-grid" data-layout="cards">
              {visible.map((look) => (
                <li key={look.id}>
                  <article className="rs-entry">
                    <div className="look-swatch" aria-hidden="true">{look.colors.map((color) => <span key={color} style={{ background: color }} />)}</div>
                    <h3>{look.title}</h3>
                    <p className="rs-entry-meta">{look.id} · {look.season}</p>
                    <p className="rs-entry-summary">{look.note}</p>
                    <dl className="site-facts">
                      <div><dt>Silhouette</dt><dd>{look.silhouette}</dd></div>
                      <div><dt>Atmosphere</dt><dd>{look.mood}</dd></div>
                      <div><dt>Material study</dt><dd>{look.texture}</dd></div>
                    </dl>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <ReaderFoot source={SOURCE} note="Self-authored styling studies drawn as colour blocks. Not a store, and no brand affiliation." />
    </Reader>
  );
}
