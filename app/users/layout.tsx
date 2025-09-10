
export default function UserLayout({children}:{children:React.ReactNode}){
    return <div> 
        <h1 style={{color:"yellow"}}> this is userLayout</h1>
        {children}
    </div>
}