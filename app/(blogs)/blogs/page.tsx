"use client"

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useBlogs } from "@/app/context/BlogsContext";
import Link from "next/link";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function BlogsComponet() {
    const { blogData, deleteData } = useBlogs();
    const router = useRouter();

    useEffect(() => {
        console.log(blogData);
    })

    const handleDelete = (id: string) => {
        const confirm = window.confirm("Are You sure you want to delete this data ?")
        if (confirm) {
            deleteData(id);
        }

    }

    const handleLogout = () => {
        const confirm = window.confirm("Are You sure you want to Logout?")
        if (confirm) {
            localStorage.removeItem("token");
            router.push("/login");
        }
    }

    if (!blogData) return <p>Loading...</p>;
    return (
        <div>
            <div className="flex justify-end w-full p-4">
                <Button
                    variant="default"
                    className="flex text-center"
                    style={{background:'rgb(63 139 90 / 65%)',color:"black"}}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>

            <div className="flex justify-center items-center min-h-screen">

                <Card className="w-5xl">
                    <CardHeader>
                        <CardTitle>
                            <h1 className="d-flex justify-center text-center font-bold text-3xl">List of Blogs</h1>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-end">
                            <Link href={"/create-blogs"}><Button>+Add</Button></Link>
                        </div>
                        <Table>
                            <TableCaption>A list of blogs.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Content</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {blogData?.map((blog) => (
                                    <TableRow key={blog._id}>
                                        <TableCell className="font-medium">{blog?.title}</TableCell>
                                        <TableCell>{blog?.content}</TableCell>
                                        <TableCell>{blog?.author}</TableCell>
                                        <TableCell>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" style={{ background: '#abf3f0' }}>View</Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Details Of Blog</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="grid gap-4">
                                                        <div className="grid gap-2 my-2">
                                                            <div className="flex ml-2">Title : <Label className="ml-2">{blog?.title}</Label></div>
                                                        </div>

                                                        <div className="grid gap-2 my-2">
                                                            <div className="flex ml-2">Content : <Label className="ml-2">{blog?.content}</Label></div>
                                                        </div>

                                                        <div className="grid gap-2 my-2">
                                                            <div className="flex ml-2">Author : <Label className="ml-2">{blog?.author}</Label></div>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="outline">Close</Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            {/* <Link href={`/read-blogs/${blog?._id}`} className="mt-6"><Button variant={"outline"}>View</Button></Link> */}
                                            <Link href={`/update-blogs/${blog?._id}`} className="mt-6 ml-2"><Button variant={"outline"} style={{ background: '#ed9de3' }}>Update</Button></Link>
                                            <Button className="ml-2 " variant={"destructive"} onClick={() => handleDelete(blog._id)} >Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

            </div>
        </div>

    )
}