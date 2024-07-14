export type UniqueId = string;

export interface Location {
  lat: number;
  lng: number;
}

export interface Marker {
  id: UniqueId;
  label: number;
  timestamp: number;
  location: Location;
}