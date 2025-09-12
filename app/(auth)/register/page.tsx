"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { withDarkMode } from "@/lib/withDarkMode";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const registerSchema = yup.object({
    firstName: yup.string().required("FirstName is required "),
    lastName: yup.string().required("LastName is required "),
    username: yup.string().required("Username is required "),
    email: yup.string().email("Invalid Email formate").required("Email is Required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),

})
type RegisterForm = yup.InferType<typeof registerSchema>

// type RegisterForm = {
//     firstName: string;
//     lastName: string;
//     username: string;
//     email: string;
//     password: string;
// };

function Register() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        resolver: yupResolver(registerSchema) 
    });

    const onSubmit = async (data: RegisterForm) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...payload } = data;
        console.log("Register Data:", payload);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
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
            <Card className="w-full max-w-sm" style={{ background: '#eafff7' }}>
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
                            <Label>First Name</Label>
                            <Input {...register("firstName")} />
                            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                        </div>

                        <div className="grid gap-2 mt-4">
                            <Label>Last Name</Label>
                            <Input {...register("lastName")} />
                            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                        </div>

                        <div className="grid gap-2 mt-4">
                            <Label>Username</Label>
                            <Input {...register("username")} />
                            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                        </div>

                        <div className="grid gap-2 mt-4">
                            <Label>Email</Label>
                            <Input {...register("email")} type="email" />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>

                        <div className="grid gap-2 mt-4">
                            <Label>Password</Label>
                            <Input {...register("password")} type="password" />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>
                        <div className="grid gap-2 mt-4">
                            <Label>Confirm Password</Label>
                            <Input {...register("confirmPassword")} type="password" />
                            {errors.confirmPassword && (
                                <p className="text-red-500">{errors.confirmPassword.message}</p>
                            )}
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
export default withDarkMode(Register)
