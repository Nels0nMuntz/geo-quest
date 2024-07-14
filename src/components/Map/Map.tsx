import { useCallback, useEffect, useState } from "react";
import { Map as GoogleMaps, MapMouseEvent } from "@vis.gl/react-google-maps";
import { useActions, useMarkers } from "@/store";
import { Marker as IMarker } from "@/types";
import MarkersList from "../MarkersList/MarkersList";

export default function Map() {
  const { addMarker, getMarkers, updateMarker } = useActions();
  const markers = useMarkers();
  const [selectedMarker, setSelectedMarker] = useState<IMarker | null>(null);
  const handleClick = (e: MapMouseEvent) => {
    if (selectedMarker) {
      return;
    } else {
      addMarker(e.detail.latLng);
    }
  };
  const handleSelectedMarker = useCallback((value: IMarker | null) => setSelectedMarker(value), []);
  useEffect(() => {
    getMarkers();
  }, []);

  return (
    <main className="h-[100dvh] w-full">
      <GoogleMaps
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
        defaultZoom={13}
        onClick={handleClick}
        mapId={process.env.GOOGLE_MAPS_MAP_ID}
        draggableCursor='default'
        draggingCursor='grab'
      >
        <MarkersList
          points={markers}
          key={JSON.stringify(markers)}
          onDragChange={handleSelectedMarker}
        />
      </GoogleMaps>
    </main>
  );
}
