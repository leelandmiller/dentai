import { useEffect, useState } from "react"
import { auth, firestore } from "~/utils/firebase.config"
import { doc, getDoc } from "firebase/firestore"
import type { User } from "firebase/auth"

// Extended user interface including Firestore data
interface ExtendedUser extends User {
  displayName: string | null
  firstName: string
  lastName: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export function useUser() {
  const [user, setUser] = useState<ExtendedUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Setup Firebase auth state listener
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        // Fetch additional user data from Firestore
        const userDoc = await getDoc(doc(firestore, "users", authUser.uid))
        const firestoreData = userDoc.data()

        // Merge Auth and Firestore data
        setUser({
          ...authUser,
          displayName:
            firestoreData?.displayName ||
            authUser.displayName ||
            firestoreData?.firstName + " " + firestoreData?.lastName ||
            "",
          firstName: firestoreData?.firstName || "",
          lastName: firestoreData?.lastName || "",
          email: firestoreData?.email || authUser.email,
          createdAt: firestoreData?.createdAt.toDate() || new Date(),
          updatedAt: firestoreData?.updatedAt.toDate() || new Date(),
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    // Cleanup subscription
    return () => unsubscribe()
  }, [])

  return { user, loading }
}
