import { collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/db";
import { Marker } from "@/types";

const getDocRef = (id: string) => doc(db, 'markers', id)

const getMarkers = async () => {
  return await getDocs(collection(db, "markers"));
};

const setMarker = async (marker: Marker) => {
  await setDoc(getDocRef(marker.id), marker);
};

const deleteMarker = async (id: string) => {
  await deleteDoc(doc(db, "markers", id));
};

export const markersService = {
  getMarkers,
  setMarker,
  deleteMarker,
};
