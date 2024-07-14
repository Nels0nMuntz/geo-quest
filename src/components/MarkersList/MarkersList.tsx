import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { useMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef, useState } from "react";
import { Marker as IMarker } from "@/types";
import { default as AdvancedMarker } from "../Marker/Marker";

interface Props {
  points: IMarker[];
  onDragChange: (value: IMarker | null) => void;
}

export default function MarkersList({ points, onDragChange }: Props) {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  }, []);

  return (
    <>
      {points.map((point) => (
        <AdvancedMarker
          key={point.id}
          {...point}
          onDragChange={onDragChange}
          setMarkerRef={setMarkerRef}
        />
      ))}
    </>
  );
}
