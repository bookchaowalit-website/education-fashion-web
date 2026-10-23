"use client";

import { useMemo, useState } from "react";
import { filterLooks, looks, nextLookId, pickSelected, silhouettes } from "@/lib/lookbook";

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(looks[1].id);
  const visible = useMemo(() => filterLooks(looks, filter), [filter]);
  const selected = pickSelected(visible, selectedId) ?? looks[0];
  return <main className="lookbook">
    <header className="nav"><a className="wordmark" href="#top">BOOK / STUDIO</a><span>LOOKBOOK 2026</span><a href="#notes">INDEX ↘</a></header>
    <section className="opening" id="top"><p className="edition">AN EDITORIAL STUDY IN FORM + SURFACE</p><h1>Clothes<br /><i>hold</i> air.</h1><p className="intro">A contact sheet of self-authored looks, built around the space between a body and the room it enters.</p><div className="opening-mark" aria-hidden="true">✳</div></section>
    <section className="contact-sheet" aria-label="Lookbook contact sheet">
      <div className="sheet-tools"><span>THE CONTACT SHEET / {visible.length} STUDIES</span><div>{silhouettes.map((item) => <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div></div>
      <div className="sheet-grid">{visible.map((look, index) => <button key={look.id} className={selected.id === look.id ? "look active" : "look"} onClick={() => setSelectedId(look.id)} aria-pressed={selected.id === look.id}>
        <span className="look-image" style={{ "--c1": look.colors[0], "--c2": look.colors[1], "--c3": look.colors[2], "--i": index } as React.CSSProperties}><span className="look-shape" /></span><span className="look-meta"><small>{look.id}</small><strong>{look.title}</strong><em>{look.silhouette}</em></span>
      </button>)}</div>
    </section>
    <section className="detail" id="notes"><div className="detail-stage" style={{ "--c1": selected.colors[0], "--c2": selected.colors[1], "--c3": selected.colors[2] } as React.CSSProperties}><span className="stage-label">{selected.season}</span><span className="stage-shape" /></div><div className="detail-copy"><p className="edition">SELECTED STUDY / {selected.id}</p><h2>{selected.title}</h2><p className="note">{selected.note}</p><dl><div><dt>SILHOUETTE</dt><dd>{selected.silhouette}</dd></div><div><dt>ATMOSPHERE</dt><dd>{selected.mood}</dd></div><div><dt>MATERIAL STUDY</dt><dd>{selected.texture}</dd></div></dl><button className="next" onClick={() => setSelectedId(nextLookId(visible, selected.id) ?? selected.id)}>Next study <span>↗</span></button></div></section>
    <footer><span>Self-authored styling studies</span><span>Not a store / no brand affiliation</span></footer>
  </main>;
}
