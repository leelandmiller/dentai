// app/utils/db.ts
import { firestore } from "./firebase.config"
import { doc, setDoc } from "firebase/firestore"

export interface User {
  uid: string
  email: string
  firstName: string
  lastName: string
  displayName: string
  createdAt: Date
  updatedAt: Date
}

export const createUser = async (
  userData: Omit<User, "createdAt" | "updatedAt">
) => {
  const timestamp = new Date()
  const userDoc = doc(firestore, "users", userData.uid)

  await setDoc(userDoc, {
    ...userData,
    createdAt: timestamp,
    updatedAt: timestamp,
  })
}
