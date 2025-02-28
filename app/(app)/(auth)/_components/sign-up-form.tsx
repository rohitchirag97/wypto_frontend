"use client";
import { signUpandOnBoardingSchema } from "@/schemas/SignUpAndOnboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useRegisterOnBoardingStore } from "@/store/onboarding";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

const signupandOnboardingSchema = signUpandOnBoardingSchema.pick({
  email: true,
  password: true,
  firstName: true,
  lastName: true,
  phoneNumber: true,
});

type SignUpAndOnboarding = z.infer<typeof signupandOnboardingSchema>;

const SignUpForm = () => {
  const router = useRouter();

  const setData = useRegisterOnBoardingStore((state) => state.setData);

  const form = useForm<SignUpAndOnboarding>({
    resolver: zodResolver(signupandOnboardingSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: SignUpAndOnboarding) => {
    setData(data);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${data.email}`
      );
      console.log(response);
      toast("User already exists, please login");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 404) {
          router.push("/onboarding/");
        } else {
          toast(
            error.response?.data.message || "Unexpected error, please try again"
          );
        }
      } else {
        toast("Unexpected error, please try again");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center space-y-3 items-center h-screen">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-center text-gray-700">
            Get started with
            <span className="text-emerald-500 italic"> 14 Day free Trial</span>
          </h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-[380px] space-y-4"
            >
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Doe" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John@domain.com" />
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
                    <FormLabel>Password</FormLabel>
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
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          Already have an account?
          <Link href="/login" className="text-emerald-500">
            &nbsp;Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpForm;
