// "use client"

// import { useState } from "react"
// import About from "../about/page";
import ButtonComponet from "../button/page"

export default async function Contact() {
    // const [count, setCount] = useState(0);
    console.log("is this client or server?")

    const response  = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json();
    console.log(data);

    return (
        <div>
            <h1>Contact Page</h1>
            <ButtonComponet />
        </div>

    )
}