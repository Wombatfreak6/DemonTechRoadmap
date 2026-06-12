import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only if config is provided
const isConfigured = !!firebaseConfig.apiKey;

const app = !isConfigured ? undefined : (!getApps().length ? initializeApp(firebaseConfig) : getApp());
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

export const githubProvider = new GithubAuthProvider();

export async function loginWithGithub() {
  if (!auth) {
    console.warn("Firebase is not configured. Missing environment variables.");
    // Mock login for demonstration
    return { user: { displayName: "Mock User", uid: "mock-123" } };
  }
  try {
    const result = await signInWithPopup(auth, githubProvider);
    return result;
  } catch (error) {
    console.error("Error signing in with GitHub", error);
    throw error;
  }
}

export async function logout() {
  if (!auth) return;
  return signOut(auth);
}

export async function syncProgressToCloud(uid: string, localProgress: Record<string, any>) {
  if (!db) return;
  try {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, { progress: localProgress }, { merge: true });
  } catch (error) {
    console.error("Error saving progress to cloud", error);
  }
}

export async function getCloudProgress(uid: string) {
  if (!db) return null;
  try {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data().progress;
    }
    return null;
  } catch (error) {
    console.error("Error fetching progress from cloud", error);
    return null;
  }
}
