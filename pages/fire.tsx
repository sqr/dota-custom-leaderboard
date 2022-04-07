import React, {useEffect, useState} from 'react'

import { firestore } from '../firebase/clientApp';
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";

export default function Fire() {
    const [leaderboards, setLeaderboards] = useState([])    
    const leaderboardsCollection = collection(firestore, 'leaderboards');

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
            asdf
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
