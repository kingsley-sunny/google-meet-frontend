import { getAuth, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { app, googleProvider } from "../../../../base/configs/firebaseConfig";

export const useGoogleAuth = () => {
  const signInWithGoogle = async () => {
    try {
      const auth = getAuth(app);

      const userCredentials = await signInWithPopup(auth, googleProvider);
      console.log("🚀 ~~ signInWithGoogle ~~ userCredentials:", userCredentials);

      //TODO: send the user email to backend
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return { signInWithGoogle };
};
