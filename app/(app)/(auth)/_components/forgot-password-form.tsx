"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

function ForgotPasswordForm() {
  const router = useRouter();
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    console.log(data);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        data
      );
      toast(`${response.data.message}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center space-y-3 items-center h-screen">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-semibold">Forgot Password</h1>
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
              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                Send Password Reset Link
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          Remembered your password?
          <Link href="/login" className="text-emerald-500 hover:underline">
            &nbsp;Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ForgotPasswordForm;
