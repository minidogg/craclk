import Link from "next/link";

export function Nav(){
    return (
        <nav>
            <div className="flex">
                <img src="/img/craclk_blob.png" className="navIcon"></img>
                <span className="text-3xl">Craclk</span>
            </div>
        {/* <ul>
          <li>
            <Link href="/leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/announcements">Announcements</Link>
          </li>
          <li>
            <Link href="/combos">Combos</Link>
          </li>
          <li>
            <Link href="/rules">Rules</Link>
          </li>
        </ul> */}
      </nav>
    )
} 