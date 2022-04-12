import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
      <div className="header">
          <ul className="headerList">
              <li><Link href='/'><a>Dota 2 Leaderboard</a></Link></li>
              <li><Link href='/fire'><a>Fire</a></Link></li>
              <li><Link href='/hello'><a>Hello</a></Link></li>
              <li style={{ float: "right" }}><Link href='/hello'><a>Profile</a></Link></li>
          </ul>
      </div>
  )
}
