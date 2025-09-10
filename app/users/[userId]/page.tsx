// "use client"

import { notFound } from "next/navigation";

async function fetchUser(userId:string){
    const user = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if(!user.ok){
        return null;
    }
    const userData = await user.json();
    return userData;
}

export default async function Users({ params }: { params: Promise<{ userId: string }> }) {

    const {userId} = await params;
    const user = await fetchUser(userId);

    if(!user){
        notFound();
    }

    return (
        <div>
            <h1>User Page: {userId}</h1>
            
            <p>--------------------------------------------------------</p>

            <div>
                <h1>{user.name}</h1>
                <p><b>Email: </b> {user.email}</p>
                <p><b>Phone: </b> {user.phone}</p>
                <p><b>Website: </b> {user.website}</p>
                <p><b>Company: </b> {user?.company?.name}</p>
                <p><b>Address: </b> {user?.address?.street} , {user?.address?.city}</p>
            </div>

        </div>
    )
}