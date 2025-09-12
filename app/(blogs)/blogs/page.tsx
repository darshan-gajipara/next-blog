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
import { useEffect, useState } from "react";
// import { useBlogs } from "@/app/context/BlogsContext";
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
import { useBlogsStore } from "@/app/store/useBlogsStore";
import Loader from "@/components/Loader/Loader";
import AxiosApi from "@/lib/axios";

function BlogsComponet() {
    // const { blogData, deleteData } = useBlogs();
    const { blogData, getAllData, deleteData, loading } = useBlogsStore();
    const router = useRouter();
    const [user, setUser] = useState<string>("");

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getCurrentUser();
            const user = data?.firstName + '  ' + data?.lastName
            setUser(user);
        };
        fetchUser();
        getAllData();
    }, [getAllData])

    const getCurrentUser = async () => {
        const res = await AxiosApi.get('/currentUser');
        return res.data;
    }

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

    if (loading) {
        return <Loader size={64} label="Loading blogs" />;
    }

    if (!blogData || blogData.length === 0) {
        return <p>No blogs found.</p>;
    }
    return (
        <div>
            <div className="flex justify-end w-full p-4 items-center gap-4">
                <div className="text-lg font-semibold text-gray-700">
                    Hello,&nbsp;welcome back <span className="text-green-600">{user}</span>
                </div>
                <Button
                    variant="default"
                    className="flex text-center"
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

export default BlogsComponet