import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { app } from '../firebase/clientApp';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Router, useRouter } from 'next/router'


const provider = new GoogleAuthProvider();
const autho = getAuth(app)
getRedirectResult(autho)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
      const user = result.user;
      console.log(user)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

export default function Auth() {
    const [user, loading, error] = useAuthState(autho)
    const router = useRouter()
    if (user) {
        router.push('/fire')
    }

    return (
    <div>auth
        <button onClick={() => signInWithRedirect(autho, provider)}>
        Login
        </button>
    </div>
  )
}
