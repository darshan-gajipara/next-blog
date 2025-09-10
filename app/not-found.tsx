import Link from "next/link";

export default function NotFoundPage(){
    return (
        <div>
            <h1 style={{color : "red" , textAlign:"center"}}>404: Page Not found !!</h1>
            <Link href="/" style={{color:"yellow", textDecoration:"underline", textAlign:"center"}}>Go back to Home</Link>
        </div>
    )
}