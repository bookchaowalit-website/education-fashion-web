// Self-authored look studies and the selection logic the lookbook page uses.

export type Look = { id: string; title: string; season: string; silhouette: string; mood: string; texture: string; note: string; colors: string[] };

export const looks: Look[] = [
  { id: "LOOK 01", title: "Soft Architecture", season: "01 / day", silhouette: "sculptural", mood: "quiet", texture: "washed cotton / folded poplin", note: "A shoulder that holds its shape while the rest of the look stays unforced.", colors: ["#d8d0c5", "#80766d", "#2a2926"] },
  { id: "LOOK 02", title: "After the Rain", season: "02 / dusk", silhouette: "longline", mood: "electric", texture: "wet nylon / brushed wool", note: "Reflective surface, low light, and one red line that refuses to disappear.", colors: ["#1d2024", "#76848d", "#b44a32"] },
  { id: "LOOK 03", title: "Borrowed Light", season: "03 / morning", silhouette: "fluid", mood: "tender", texture: "sheer voile / dry linen", note: "Layers are arranged to let the room become part of the garment.", colors: ["#e7dfd3", "#c4b7ad", "#a18b81"] },
  { id: "LOOK 04", title: "Hard Reset", season: "04 / night", silhouette: "tailored", mood: "decisive", texture: "compressed felt / lacquered twill", note: "A strict line gives a soft body somewhere to go.", colors: ["#171512", "#554843", "#cdb7a9"] },
];
export const silhouettes = ["all", ...Array.from(new Set(looks.map((look) => look.silhouette)))];


export function filterLooks(items: Look[], silhouette: string): Look[] {
  return silhouette === "all" ? items : items.filter((look) => look.silhouette === silhouette);
}

// The open look must be one the visitor can see: if the filter hides it, the first visible look opens.
export function pickSelected(visible: Look[], selectedId: string): Look | undefined {
  return visible.find((look) => look.id === selectedId) ?? visible[0];
}

// "Next study" steps through the visible looks only, wrapping at the end.
export function nextLookId(visible: Look[], selectedId: string): string | undefined {
  if (visible.length === 0) return undefined;
  const index = visible.findIndex((look) => look.id === selectedId);
  return visible[(index + 1) % visible.length].id;
}
