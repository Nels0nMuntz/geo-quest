import {
  query,
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { db } from "@/db";
import { Marker } from "@/types";

const getDocumentRef = (id: string) => doc(db, "markers", id);

const getMarkers = async () => {
  return await getDocs(collection(db, "markers"));
};

const setMarker = async (marker: Marker) => {
  const nextDocumentRef = getDocumentRef(marker.id);
  const querySnapshot = await getDocs(query(
    collection(db, "markers"),
    orderBy("timestamp", "desc"),
    limit(1),
  ));
  if (querySnapshot.size) {
    const prevDocument = querySnapshot.docs[0].data() as Marker;
    const prevDocumentRef = getDocumentRef(prevDocument.id);
    await setDoc(prevDocumentRef, { ...prevDocument, next: marker.id });
  } 
  await setDoc(nextDocumentRef, marker);
};

const deleteMarker = async (id: string) => {
  const snapshot = await getDoc(getDocumentRef(id));
  const marker = snapshot.data() as Marker;
  await deleteDoc(doc(db, "markers", id));
};

export const markersService = {
  getMarkers,
  setMarker,
  deleteMarker,
};
