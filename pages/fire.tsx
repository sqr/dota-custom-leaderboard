import React, {useEffect, useState} from 'react'

import { firestore, app } from '../firebase/clientApp';
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs, doc } from "@firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Fire() {
    const [leaderboards, setLeaderboards] = useState([])    
    const leaderboardsCollection = collection(firestore, 'leaderboards');
    const usersCollection = collection(firestore, 'users');
    const auth = getAuth(app)
    const [user, loading, error] = useAuthState(auth)

    useEffect(() => {
        if (user) {
            console.log('user detected')
            const userRef = doc(usersCollection, user.uid)
            const leaderboardsQuery = query(leaderboardsCollection, where('createdBy', '==', userRef));
            getDocs(leaderboardsQuery)
                .then((data) => {
                    data.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());
                        let dato = doc.data()
                        dato.id = doc.id
                        setLeaderboards(oldLeaderboards => [...oldLeaderboards, dato])
                    })
            })
        } 
    }, [user])

    const listLeaderboards = leaderboards.map((leaderboard) => {
        <li>{leaderboard.name}</li>
    });
    return (
    <div>
        firestore
            {user ? user.displayName : 'No user'}
            <ul>
                {leaderboards.map((note) => {
                    return (
                            <li key={note.id}>{note.name}</li>
                    )
                })}
            </ul>
    </div>
  )
}
