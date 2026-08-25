"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { companyInfo } from "@/lib/data/content";

// Default Leaflet marker assets don't resolve correctly under Next's bundler —
// point them at the CDN copies instead of shipping our own icon files.
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function SiteMap() {
  const position: [number, number] = [companyInfo.lat, companyInfo.lng];

  return (
    <MapContainer
      center={position}
      zoom={16}
      scrollWheelZoom={false}
      className="h-full w-full rounded"
      aria-label={`Map showing Eagle Watch Security Services at ${companyInfo.addressLine}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={markerIcon}>
        <Popup>
          {companyInfo.name}
          <br />
          {companyInfo.addressLine}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
