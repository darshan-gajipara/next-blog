// "use client"

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "This is User Page",
  description: "User details",
  keywords:["users", "user details", "nextJS"],
};

export default async function Users(){
    const response  = await fetch("https://jsonplaceholder.typicode.com/users")
    const users = await response.json();

    return (
        <div>
            <h1>Users Page</h1>
            <p>--------------------------------------------------------</p>
            <ul>
                {users.map((user: { id: number; name: string }) => (
                    // <li key={user.id}>{user.name}</li>
                    <li key={user.id}><Link href={`/users/${user.id}`}>{user.name}</Link></li>
                ))}
            </ul>
        </div>
    )
}