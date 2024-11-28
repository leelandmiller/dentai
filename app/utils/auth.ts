import { auth } from "~/utils/firebase.config"
import { createUser } from "./db"
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth"

// Add proper type annotations
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(auth, provider)
    const { user } = result
    const isNewUser =
      result.user.metadata.creationTime === result.user.metadata.lastSignInTime

    if (isNewUser) {
      // Create user document for new Google sign-ins
      const [firstName, lastName] = user.displayName?.split(" ") ?? ["", ""]
      await createUser({
        uid: user.uid,
        email: user.email!,
        firstName,
        lastName,
        displayName: firstName + " " + lastName,
      })
    }

    return { isNewUser }
  } catch (error) {
    console.error("Error signing in with Google", error)
    throw error
  }
}

export const signInWithEmail = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error("Error signing in with email", error)
    throw error
  }
}

export const registerWithEmail = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const { user } = userCredential

    // Create the user document in Firestore
    await createUser({
      uid: user.uid,
      email: user.email!,
      firstName,
      lastName,
      displayName: firstName + " " + lastName,
    })

    return user
  } catch (error) {
    console.error("Error registering with email", error)
    throw error
  }
}

export const logOut = async () => {
  try {
    await signOut(auth)
    // Clear any Firestore listeners or cached data if needed
    // Optionally clear any local state/storage here
  } catch (error) {
    console.error("Error signing out", error)
    throw error
  }
}

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    console.error("Error sending password reset email", error)
    throw error
  }
}
