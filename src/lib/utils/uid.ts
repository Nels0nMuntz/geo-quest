import { UniqueId } from "@/types";

export function uid(): UniqueId {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
