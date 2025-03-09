"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        data
      );
      toast(`${res.data.message}`);
      console.log(res.data);
      router.push(`${res.data.data.user.company.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data.error || error.message);
      } else {
        toast("Unexpected error, please try again later");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center space-y-3 items-center h-screen">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500">Login to your account</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-[380px] space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-emerald-500 hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="********"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="w-[380px] flex justify-center">
            <Link href="/register" className="text-emerald-500 hover:underline">
              Click Here to Register for 14 Days Free Trial
            </Link>{" "}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
