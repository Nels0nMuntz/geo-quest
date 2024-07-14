import { Location, Marker, UniqueId } from "@/types";

export interface AppState {
  markers: Marker[];
};

export interface AppActions {
  actions: {
    getMarkers: () => Promise<void>;
    addMarker: (location: Location) => Promise<void>;
    updateMarker: (marker: Omit<Marker, "timestamp">) => Promise<void>;
    deleteMarker: (id: UniqueId) => Promise<void>;
    deleteMarkers: () => Promise<void>;
  }
}