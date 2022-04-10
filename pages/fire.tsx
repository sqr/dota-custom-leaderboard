import React, {useEffect, useState} from 'react'

import { firestore, app } from '../firebase/clientApp';
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Fire() {
    const [leaderboards, setLeaderboards] = useState([])    
    const leaderboardsCollection = collection(firestore, 'leaderboards');
    const auth = getAuth(app)
    const [user, loading, error] = useAuthState(auth)
    console.log(user)

    const getNotes = () => {
        const leaderboardsQuery = query(leaderboardsCollection);
        getDocs(leaderboardsQuery)
            .then((data) => {
                setLeaderboards(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                }));
            })
    }
    useEffect(() => {
        getNotes();
    }, [])
    
    const listLeaderboards = leaderboards.map((leaderboard) => {
        console.log(leaderboard);
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
