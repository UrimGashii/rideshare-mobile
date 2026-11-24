"use client";
import { useState } from "react";
import type { Udhetim } from "@/lib/udhetimet";

function Karta({ udhetim, favorite, onSaved }: { udhetim: Udhetim; favorite: boolean; onSaved: (id: string) => void }) {
  const [saved, setSaved] = useState(favorite); const [pending, setPending] = useState(false); const [message, setMessage] = useState(favorite ? "I ruajtur" : "Nuk është te të preferuarat.");
  async function save() { if (saved || pending) return; setPending(true); setSaved(true); setMessage("Po ruhet…"); try { const response = await fetch(`/api/preferencat/${udhetim.id}`, { method: "POST" }); if (!response.ok) throw new Error("save"); setMessage("I ruajtur · U ruajt te të preferuarat."); onSaved(udhetim.id); } catch { setSaved(false); setMessage("Nuk u ruajt. Provo përsëri."); } finally { setPending(false); } }
  return <article className="trip-card"><h2>UDHËTIMI {udhetim.id}</h2><p>Shoferi · {udhetim.nisja} → {udhetim.destinacioni}</p><p>Nisja: {udhetim.ora} · Vende: {udhetim.vende}</p><button className={`favorite-button ${saved ? "saved" : ""}`} onClick={save} disabled={pending || saved} aria-pressed={saved}><span aria-hidden="true">{saved ? "★" : "☆"}</span> {pending ? "Po ruhet…" : saved ? "I ruajtur" : "Ruaj udhëtimin"}</button><p className={saved ? "favorite-message saved-text" : "favorite-message"}>{message}</p></article>;
}

export default function UdhëtimetMePreferime({ udhetimet, initialFavoriteIds }: { udhetimet: Udhetim[]; initialFavoriteIds: string[] }) { const [favoriteIds, setFavoriteIds] = useState(() => new Set(initialFavoriteIds)); function onSaved(id: string) { setFavoriteIds((current) => new Set(current).add(id)); } return <><section className="favorites-summary"><strong>Të preferuarat</strong><span>{favoriteIds.size}</span><small>Preferim personal · jo rezervim</small></section><div className="trip-list">{udhetimet.map((udhetim) => <Karta key={udhetim.id} udhetim={udhetim} favorite={favoriteIds.has(udhetim.id)} onSaved={onSaved} />)}</div></>; }
