"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";

type RegisterForm = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
};

export default function Register() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();

    const onSubmit = async (data: RegisterForm) => {
        console.log("Register Data:", data);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                throw new Error("Register failed");
            }

            const result = await res.json();
            console.log("Login success:", result);
            localStorage.setItem("token", result?.JWT_Token)
            router.push("/blogs");
        } catch (err) {
            console.error("Error logging in:", err);
        }


    };

    return (
        <div className="flex min-h-screen items-center justify-center" >
            <Card className="w-full max-w-sm" style={{background:'#eafff7'}}>
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>
                        Create your new Account
                    </CardDescription>
                    <CardAction>
                        <Link href="/login">
                            <Button variant="link" >Login</Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-2 mt-4">
                            <Label>FirstName</Label>
                            <Input {...register("firstName")} type="text" required />
                            {errors.firstName?.type === 'required' && <p role="alert" className='text-danger'> FirstName is required</p>}
                        </div>

                        <div className="grid gap-2 mt-4">
                            <Label>LastName</Label>
                            <Input {...register("lastName")} type="text" required />
                            {errors.lastName?.type === 'required' && <p role="alert" className='text-danger'> LastName is required</p>}
                        </div>

                        <div className="grid gap-2 mt-4">
                            <Label>UserName</Label>
                            <Input {...register("username")} type="text" required />
                            {errors.username?.type === 'required' && <p role="alert" className='text-danger'> UserName is required</p>}
                        </div>

                        <div className="grid gap-2 mt-4">
                            <Label>Email</Label>
                            <Input {...register("email")} type="email" required />
                            {errors.email?.type === 'required' && <p role="alert" className='text-danger'> Email is required</p>}
                        </div>
                        <div className="grid gap-2 mt-4">
                            <Label>Password</Label>
                            <Input {...register("password")} type="password" required />
                            {errors.password?.type === 'required' && <p role="alert" className='text-danger'> Password is required</p>}
                        </div>
                        <Button type="submit" className="w-full mt-6">
                            Register
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
