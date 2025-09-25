"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { withDarkMode } from "@/lib/withDarkMode";
import { signIn } from "next-auth/react"; // <- import next-auth
import Image from "next/image";

type LoginForm = {
    email: string;
    password: string;
};

function Login() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
    console.log('process.env.NEXTAUTH_URL', process.env.NEXT_PUBLIC_NEXTAUTH_URL)
    console.log('process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
    const onSubmit = async (data: LoginForm) => {
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Login failed");

            const result = await res.json();
            localStorage.setItem("token", result?.JWT_Token);
            router.push("/blogs");
        } catch (err) {
            console.error("Error logging in:", err);
        }
    };

    const handleGoogleLogin = async () => {
        await signIn("google", { callbackUrl: '/blogs' })
    };

    const handleGitHubLogin = async () => {
        await signIn("github", { callbackUrl: "/blogs" });
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-sm" style={{ background: "#eafff7" }}>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your email below to login to your account</CardDescription>
                    <CardAction>
                        <Link href="/register">
                            <Button variant="link">Sign Up</Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-2">
                            <Label>Email</Label>
                            <Input {...register("email")} type="email" required />
                            {errors.email?.type === "required" && (
                                <p role="alert" className="text-danger">
                                    Email is required
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2 mt-4">
                            <Label>Password</Label>
                            <Input {...register("password")} type="password" required />
                            {errors.password?.type === "required" && (
                                <p role="alert" className="text-danger">
                                    Password is required
                                </p>
                            )}
                        </div>
                        <Button type="submit" className="w-full mt-6">
                            Login
                        </Button>
                    </form>

                    <div className="mt-4 text-center">
                        <Button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-2">
                            <Image
                                src="/googleicon.png" // ✅ public folder path
                                alt="Google"
                                width={20}
                                height={20}
                            />
                            <span>Sign in with Google</span>
                        </Button>
                    </div>

                    <div className="mt-2 text-center">
                        <Button
                            onClick={handleGitHubLogin}
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2"
                        >
                            <Image
                                src="/githubicon.png"
                                alt="GitHub Icon"
                                width={20}
                                height={20}
                            />
                            Sign in with GitHub
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}

export default withDarkMode(Login);
