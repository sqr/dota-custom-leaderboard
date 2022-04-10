import React, {useState} from 'react'
import { firestore, app } from '../../firebase/clientApp'
import { useCollection } from "react-firebase-hooks/firestore"
import { doc, setDoc, collection, Timestamp } from "firebase/firestore"; 
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function NewLeaderboard() {
    const auth = getAuth(app)
    const [user, loading, error] = useAuthState(auth)
    const [playerList, setPlayerList] = useState([])
    const usersCollection = collection(firestore, 'users');
    const newRef = doc(collection(firestore, 'leaderboards'))

    const addLeaderboard = async () => { 
        await setDoc(newRef, {
            playerList: [playerList],
            createdAt: Timestamp.fromDate(new Date),
            createdBy: doc(usersCollection, user.uid),
        })
    }
  return (
      <div>
          <h1>Create New Leaderboard</h1>
          <button onClick={() => addLeaderboard()}>Add Leaderboard</button>
      </div>
  )
}
