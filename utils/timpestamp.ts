import {
  Timestamp
} from "firebase/firestore";

export const convertFirestoreTimestampToString = (timestamp: Timestamp) =>
  new Date(timestamp.toDate().getTime()).toLocaleDateString();
