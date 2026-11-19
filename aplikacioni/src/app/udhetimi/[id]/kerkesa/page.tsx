import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";
import GjendjaLive from "@/components/GjendjaLive";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function Kerkesa({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; let udhetim; try { udhetim = await gjejUdhetimin(id); } catch { return <main><h1>RideShare</h1><p role="alert">Nuk u lidhëm me databazën.</p></main>; } if (!udhetim) notFound(); return <main><Link href={`/udhetimi/${id}`}>← Kthehu te detajet</Link><h1>Udhëtarja · RideShare</h1><p>Hyr me llogarinë e udhëtarit. Kërkesa ruhet në Neon dhe lexohet pa Refresh.</p><GjendjaLive id={id} role="udhetar" initialTrip={{ ...udhetim, shoferEmri: "Shoferi" }} /></main>; }
