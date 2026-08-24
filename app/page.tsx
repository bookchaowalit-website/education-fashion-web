"use client";

import { useMemo, useState } from "react";

type Look = { id: string; title: string; season: string; silhouette: string; mood: string; texture: string; note: string; colors: string[] };
const looks: Look[] = [
  { id: "LOOK 01", title: "Soft Architecture", season: "01 / day", silhouette: "sculptural", mood: "quiet", texture: "washed cotton / folded poplin", note: "A shoulder that holds its shape while the rest of the look stays unforced.", colors: ["#d8d0c5", "#80766d", "#2a2926"] },
  { id: "LOOK 02", title: "After the Rain", season: "02 / dusk", silhouette: "longline", mood: "electric", texture: "wet nylon / brushed wool", note: "Reflective surface, low light, and one red line that refuses to disappear.", colors: ["#1d2024", "#76848d", "#b44a32"] },
  { id: "LOOK 03", title: "Borrowed Light", season: "03 / morning", silhouette: "fluid", mood: "tender", texture: "sheer voile / dry linen", note: "Layers are arranged to let the room become part of the garment.", colors: ["#e7dfd3", "#c4b7ad", "#a18b81"] },
  { id: "LOOK 04", title: "Hard Reset", season: "04 / night", silhouette: "tailored", mood: "decisive", texture: "compressed felt / lacquered twill", note: "A strict line gives a soft body somewhere to go.", colors: ["#171512", "#554843", "#cdb7a9"] },
];
const silhouettes = ["all", ...Array.from(new Set(looks.map((look) => look.silhouette)))];

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(looks[1].id);
  const visible = useMemo(() => filter === "all" ? looks : looks.filter((look) => look.silhouette === filter), [filter]);
  const selected = looks.find((look) => look.id === selectedId) ?? visible[0] ?? looks[0];
  return <main className="lookbook">
    <header className="nav"><a className="wordmark" href="#top">BOOK / STUDIO</a><span>LOOKBOOK 2026</span><a href="#notes">INDEX ↘</a></header>
    <section className="opening" id="top"><p className="edition">AN EDITORIAL STUDY IN FORM + SURFACE</p><h1>Clothes<br /><i>hold</i> air.</h1><p className="intro">A contact sheet of self-authored looks, built around the space between a body and the room it enters.</p><div className="opening-mark" aria-hidden="true">✳</div></section>
    <section className="contact-sheet" aria-label="Lookbook contact sheet">
      <div className="sheet-tools"><span>THE CONTACT SHEET / {visible.length} STUDIES</span><div>{silhouettes.map((item) => <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div></div>
      <div className="sheet-grid">{visible.map((look, index) => <button key={look.id} className={selected.id === look.id ? "look active" : "look"} onClick={() => setSelectedId(look.id)} aria-label={`Select ${look.title}`}>
        <span className="look-image" style={{ "--c1": look.colors[0], "--c2": look.colors[1], "--c3": look.colors[2], "--i": index } as React.CSSProperties}><span className="look-shape" /></span><span className="look-meta"><small>{look.id}</small><strong>{look.title}</strong><em>{look.silhouette}</em></span>
      </button>)}</div>
    </section>
    <section className="detail" id="notes"><div className="detail-stage" style={{ "--c1": selected.colors[0], "--c2": selected.colors[1], "--c3": selected.colors[2] } as React.CSSProperties}><span className="stage-label">{selected.season}</span><span className="stage-shape" /></div><div className="detail-copy"><p className="edition">SELECTED STUDY / {selected.id}</p><h2>{selected.title}</h2><p className="note">{selected.note}</p><dl><div><dt>SILHOUETTE</dt><dd>{selected.silhouette}</dd></div><div><dt>ATMOSPHERE</dt><dd>{selected.mood}</dd></div><div><dt>MATERIAL STUDY</dt><dd>{selected.texture}</dd></div></dl><button className="next" onClick={() => setSelectedId(looks[(looks.findIndex((look) => look.id === selected.id) + 1) % looks.length].id)}>Next study <span>↗</span></button></div></section>
    <footer><span>Self-authored styling studies</span><span>Not a store / no brand affiliation</span></footer>
  </main>;
}
