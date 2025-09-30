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
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
// import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function BlogsComponet() {
    const { data: session } = useSession();
    // const { blogData, deleteData } = useBlogs();
    const { blogResponse, getAllData, deleteData, loading } = useBlogsStore();
    const router = useRouter();
    const [user, setUser] = useState<string>("");
    const [quarry, setQuarry] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(2);

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
        // const confirm = window.confirm("Are You sure you want to delete this data ?")
        // if (confirm) {
        // }
        deleteData(id);
    }

    const handleSearch = (search: string) => {
        setQuarry(search)
        getAllData(search, page, limit);
    }

    const handleLogout = async () => {
        // const confirmLogout = window.confirm("Are you sure you want to Logout?");
        // if (!confirmLogout) return;
        localStorage.removeItem("token");

        try {
            await signOut({ redirect: false });
        } catch (error) {
            console.warn("Google logout failed (maybe user was not logged in via Google):", error);
        }
        router.push("/login");
    };

    if (loading) {
        return <Loader size={64} label="Loading blogs" />;
    }

    // if (!blogResponse || blogResponse?.data?.length === 0) {
    //     return <p>No blogs found.</p>;
    // }
    return (
        <div>
            <div className="flex justify-between items-center border-b px-4">
                <div>
                    <Link href={"/"} className="pl-5">Home</Link>
                    <Link href={"/about"} className="pl-5">About</Link>
                    <Link href={"/contact"} className="pl-5">Contact</Link>
                    <Link href={"/users"} className="pl-5">Users</Link>
                    <Link href={"/blogs"} className="pl-5">Blogs</Link>
                    <Link href={"/tanstack"} className="pl-5">Tanstack</Link>
                    <Link href={"/providerForm"} className="pl-5">ProviderForm</Link>
                    <Link href={"/multiStepForm"} className="pl-5">MultiStepForm</Link>
                    <Link href={"/counter"} className="pl-5">Counter</Link>
                    <Link href={"/table"} className="pl-5">Tanstack Table</Link>
                </div>
                <div className="flex justify-end w-full p-4 items-center gap-4">
                    <div className="text-lg font-semibold text-gray-700">
                        Hello,&nbsp;welcome back <span className="text-green-600">{session ? session.user?.name : user}</span>
                    </div>
                    {/* <Button
                        variant="default"
                        className="flex text-center"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button> */}


                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="default">Logout</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to Logout?</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>


                </div>
            </div>

            <div className="flex justify-center items-center min-h-screen">

                <Card className="w-5xl">
                    <CardHeader>
                        <CardTitle>
                            <h1 className="d-flex justify-center text-center font-bold text-3xl">List of Blogs</h1>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input
                            placeholder="Search..."
                            className="w-2xl border"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
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
                                {!blogResponse || blogResponse?.data?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            No record found..
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    blogResponse.data.map((blog) => (
                                        <TableRow key={blog._id}>
                                            <TableCell className="font-medium">{blog?.title}</TableCell>
                                            <TableCell>{blog?.content}</TableCell>
                                            <TableCell>{blog?.author}</TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" style={{ background: "#abf3f0" }}>
                                                            View
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Details Of Blog</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="grid gap-4">
                                                            <div className="grid gap-2 my-2">
                                                                <div className="flex ml-2">
                                                                    Title : <Label className="ml-2">{blog?.title}</Label>
                                                                </div>
                                                            </div>
                                                            <div className="grid gap-2 my-2">
                                                                <div className="flex ml-2">
                                                                    Content : <Label className="ml-2">{blog?.content}</Label>
                                                                </div>
                                                            </div>
                                                            <div className="grid gap-2 my-2">
                                                                <div className="flex ml-2">
                                                                    Author : <Label className="ml-2">{blog?.author}</Label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline">Close</Button>
                                                            </DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                                <Link
                                                    href={`/update-blogs/${blog?._id}`}
                                                    className="mt-6 ml-2"
                                                >
                                                    <Button
                                                        variant="outline"
                                                        style={{ background: "#ed9de3" }}
                                                    >
                                                        Update
                                                    </Button>
                                                </Link>
                                                {/* <Button
                                                    className="ml-2"
                                                    variant="destructive"
                                                    onClick={() => handleDelete(blog._id)}
                                                >
                                                    Delete
                                                </Button> */}

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button className="ml-2" variant="destructive">Delete</Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are You sure you want to delete this data ?</AlertDialogTitle>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(blog._id)}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>

                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                        <Pagination>
                            <PaginationContent>
                                {/* Previous button */}
                                <PaginationItem>
                                    <Button
                                        variant="outline"
                                        disabled={page === 1}
                                        onClick={() => {
                                            const newPage = Math.max(1, page - 1);
                                            setPage(newPage);
                                            getAllData(quarry, newPage, limit);
                                        }}
                                    >
                                        Previous
                                    </Button>
                                </PaginationItem>

                                {/* Page numbers */}
                                {Array.from({ length: blogResponse?.pagination?.totalPages || 1 }).map(
                                    (_, index) => {
                                        const pageNumber = index + 1;
                                        return (
                                            <PaginationItem key={pageNumber}>
                                                <Button
                                                    variant={page === pageNumber ? "default" : "outline"}
                                                    onClick={() => {
                                                        setPage(pageNumber);
                                                        getAllData(quarry, pageNumber, limit);
                                                    }}
                                                >
                                                    {pageNumber}
                                                </Button>
                                            </PaginationItem>
                                        );
                                    }
                                )}

                                {/* Next button */}
                                <PaginationItem>
                                    <Button
                                        variant="outline"
                                        disabled={page === blogResponse?.pagination?.totalPages}
                                        onClick={() => {
                                            const newPage = Math.min(
                                                blogResponse?.pagination?.totalPages ?? 1,
                                                page + 1
                                            );
                                            setPage(newPage);
                                            getAllData(quarry, newPage, limit);
                                        }}
                                    >
                                        Next
                                    </Button>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>


                    </CardContent>
                </Card>

            </div>
        </div>

    )
}

export default BlogsComponet