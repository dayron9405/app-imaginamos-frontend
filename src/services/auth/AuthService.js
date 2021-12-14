import { 
    auth,
    signOut, 
    signInWithPopup,
    googleAuthProvider,
    facebookAuthProvider,
    microsoftAuthProvider
} from '../../firebase/firebase-config';

const AuthService = {
    registerGoogle(){
        return signInWithPopup(auth, googleAuthProvider);
    },

    registerFacebook(){
        return signInWithPopup(auth, facebookAuthProvider);
    },

    registerMicrosoft(){
        return signInWithPopup(auth, microsoftAuthProvider)
    },

    signOutFirebase(){
        return signOut(auth);
    }
}
export default AuthService