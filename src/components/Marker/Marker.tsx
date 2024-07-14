import { AdvancedMarker } from "@vis.gl/react-google-maps";
import type { Marker as GoogleMarker } from "@googlemaps/markerclusterer";
import { Marker } from "@/types";
import { forwardRef, useCallback } from "react";
import { LucideCircleX } from "lucide-react";
import { useActions } from "@/store";
import { Button } from "../ui/button";

interface Props extends Marker {
  onDragChange: (value: Marker | null) => void;
  setMarkerRef?: (marker: GoogleMarker, key: string) => void;
}

export default function Marker({ onDragChange, setMarkerRef, ...marker }: Props) {
  const { deleteMarker, updateMarker } = useActions();
  const hendleDelete = () => {
    deleteMarker(marker.id);
  };
  const handleDragStart = (e: google.maps.MapMouseEvent) => onDragChange(marker);
  const handleDragEnd = (e: google.maps.MapMouseEvent) => {
    onDragChange(null);
    updateMarker({
      ...marker,
      location: {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    });
  };
  const handleMarkerRef = useCallback(
    (element: google.maps.marker.AdvancedMarkerElement) =>
      setMarkerRef && setMarkerRef(element, marker.id),
    [setMarkerRef, marker.id],
  );
  return (
    <AdvancedMarker
      key={marker.id}
      position={marker.location}
      draggable
      // onClick={(e) => e.stop()}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      // clickable={false}
      className='focus-visible:outline-none'
      ref={handleMarkerRef}
    >
      <div className='relative -top-2 rounded-sm bg-blue-500 px-4 py-3 text-white before:absolute before:left-1/2 before:top-full before:h-0 before:w-0 before:-translate-x-1/2 before:border-x-8 before:border-t-8 before:border-solid before:border-x-transparent before:border-t-blue-500'>
        {marker.label}
        <Button
          className='absolute right-0 top-0 z-10 h-4 w-4 -translate-y-2 translate-x-2 rounded-full bg-transparent'
          variant='ghost'
          size='icon'
          onClick={hendleDelete}
        >
          <LucideCircleX className='h-4 w-4 select-none' />
        </Button>
      </div>
    </AdvancedMarker>
  );
}
