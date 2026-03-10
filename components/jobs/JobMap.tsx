"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { JobListing } from "@/lib/jobs/mockData";

/* Leaflet CSS must be imported client-side */
import "leaflet/dist/leaflet.css";

/**
 * Fix for Leaflet default marker icon not loading in Next.js.
 * The default icon URLs point to node_modules which are not served.
 */
const orangeIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#ea580c"/>
      <circle cx="12" cy="12" r="5" fill="white"/>
    </svg>`),
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
});

const blueIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#0284c7"/>
      <circle cx="12" cy="12" r="5" fill="white"/>
    </svg>`),
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
});

const activeIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 45" width="30" height="45">
      <path d="M15 0C6.7 0 0 6.7 0 15c0 11.2 15 30 15 30s15-18.8 15-30C30 6.7 23.3 0 15 0z" fill="#f97316"/>
      <circle cx="15" cy="15" r="6" fill="white"/>
    </svg>`),
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -45],
});

interface JobMapProps {
  jobs: JobListing[];
  activeJobId: string | null;
  onMarkerClick?: (id: string) => void;
}

/**
 * Inner component that reacts to activeJobId changes
 * and pans the map to the active marker.
 */
function MapController({ jobs, activeJobId }: { jobs: JobListing[]; activeJobId: string | null }) {
  const map = useMap();

  useEffect(() => {
    if (!activeJobId) return;
    const job = jobs.find((j) => j.id === activeJobId);
    if (job) {
      map.setView([job.lat, job.lng], 10, { animate: true });
    }
  }, [activeJobId, jobs, map]);

  return null;
}

/**
 * Leaflet map component showing job listing pins.
 * Orange pins = seeking operator, blue pins = seeking job.
 * Loaded via next/dynamic with ssr: false.
 */
export function JobMap({ jobs, activeJobId, onMarkerClick }: JobMapProps) {
  /* Szczecin center coordinates */
  const center: [number, number] = [53.4285, 14.5528];

  return (
    <MapContainer
      center={center}
      zoom={8}
      className="h-full w-full"
      scrollWheelZoom={true}
      style={{ background: "#1e293b" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <MapController jobs={jobs} activeJobId={activeJobId} />
      {jobs.map((job) => {
        const isActive = activeJobId === job.id;
        const icon =
          isActive
            ? activeIcon
            : job.type === "seeking_operator"
              ? orangeIcon
              : blueIcon;

        return (
          <Marker
            key={job.id}
            position={[job.lat, job.lng]}
            icon={icon}
            eventHandlers={{
              click: () => onMarkerClick?.(job.id),
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold text-slate-900">{job.title}</p>
                <p className="text-slate-600">
                  {job.location} &bull; {job.radiusKm} km
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
