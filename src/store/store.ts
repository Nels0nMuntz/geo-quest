import { create } from "zustand";
import { toast } from "sonner";
import { AppState, AppActions } from "./types";
import { Marker } from "@/types";
import { uid } from "@/lib";
import { markersService } from "@/services";

const useAppStore = create<AppState & AppActions>((set, get) => ({
  markers: [],
  actions: {
    getMarkers: async () => {
      try {
        const querySnapshot = await markersService.getMarkers();
        set({ markers: querySnapshot.docs.map((doc) => doc.data() as Marker) });
      } catch (error) {
        console.log(error);
        toast("Failed to load markers", {
          action: {
            label: "Try again",
            onClick: get().actions.getMarkers,
          },
        });
      }
    },
    addMarker: async (location) => {
      const { markers, actions } = get();
      const marker: Marker = {
        id: uid(),
        label: markers.length + 1,
        timestamp: Date.now(),
        location,
      };
      try {
        await markersService.setMarker(marker);
        await actions.getMarkers();
      } catch (error) {
        console.log(error);
        toast("Failed to add new marker", {
          action: {
            label: "Try again",
            onClick: () => get().actions.addMarker(location),
          },
        });
      }
    },

    updateMarker: async (marker) => {
      try {
        await markersService.setMarker({
          ...marker,
          timestamp: Date.now(),
        });
        await get().actions.getMarkers();
      } catch (error) {
        console.log(error);
        toast("Failed to updated marker", {
          action: {
            label: "Try again",
            onClick: () => get().actions.updateMarker(marker),
          },
        });
      }
    },
    deleteMarker: async (id) => {
      try {
        await markersService.deleteMarker(id);
        await get().actions.getMarkers();
      } catch (error) {
        console.log(error);
        toast("Failed to delete marker", {
          action: {
            label: "Try again",
            onClick: () => get().actions.deleteMarker(id),
          },
        });
      }
    },
    deleteMarkers: async () => {
      try {
        const querySnapshot = await markersService.getMarkers();
        await Promise.all(querySnapshot.docs.map((doc) => markersService.deleteMarker(doc.id)));
        await get().actions.getMarkers();
      } catch (error) {
        console.log(error);
        toast("Failed to delete markers", {
          action: {
            label: "Try again",
            onClick: get().actions.deleteMarkers,
          },
        });
      }
    },
  },
}));

export const useMarkers = () => useAppStore((state) => state.markers);
export const useActions = () => useAppStore((state) => state.actions);
