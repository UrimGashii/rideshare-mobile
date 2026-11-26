"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type Njoftim = { id: number; kerkesaId: number; lloji: "pranuar" | "refuzuar"; lexuarMe: string | null; krijuarMe: string; udhetimId: string; nisja: string; destinacioni: string; ora: string; status: string };

export default function NjoftimetLive() {
  const [items, setItems] = useState<Njoftim[]>([]);
  const [unread, setUnread] = useState(0);
  const [online, setOnline] = useState(true);
  const seen = useRef(new Set<number>());
  const read = useCallback(async () => {
    try { const response = await fetch("/api/njoftimet", { cache: "no-store" }); if (!response.ok) throw new Error(); const data = await response.json(); setItems(data.njoftimet); setUnread(data.tePalexuara); setOnline(true); data.njoftimet.forEach((item: Njoftim) => seen.current.add(item.id)); }
    catch { setOnline(false); }
  }, []);
  useEffect(() => { void read(); const timer = window.setInterval(() => void read(), 5000); return () => window.clearInterval(timer); }, [read]);
  return <section className="notifications" aria-live="polite"><h1>Njoftimet <span className="badge">{unread} të palexuara</span></h1>{!online && <p role="alert">Po rilidhemi; po ruajmë historinë e fundit.</p>}{items.length === 0 ? <p>Ende pa njoftime.</p> : <ul>{items.map((item) => <li key={item.id} className={item.lexuarMe ? "read" : "unread"}><Link href={`/njoftimet/${item.id}`}>{item.lloji === "pranuar" ? "Dritoni e pranoi kërkesën" : "Kërkesa u refuzua"}<small>Kërkesa K-{item.kerkesaId} · {item.nisja} → {item.destinacioni} · {item.lexuarMe ? "E lexuar" : "E palexuar"}</small></Link></li>)}</ul>}<p className="poll-note">Përditësim automatik çdo 5 sekonda.</p></section>;
}
