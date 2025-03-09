"use client";
import z from "zod";
import { signUpandOnBoardingSchema } from "@/schemas/SignUpAndOnboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useRegisterOnBoardingStore } from "@/store/onboarding";
import { useEffect } from "react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const onBoardingCOmapnySchema = signUpandOnBoardingSchema.pick({
  companyName: true,
});

type OnBoardingCompanySchema = z.infer<typeof onBoardingCOmapnySchema>;

export default function OnboardingPage() {
  const router = useRouter();
  
  const firstName = useRegisterOnBoardingStore((state) => state.firstName);
  const lastName = useRegisterOnBoardingStore((state) => state.lastName);
  const email = useRegisterOnBoardingStore((state) => state.email);
  const password = useRegisterOnBoardingStore((state) => state.password);
  const phoneNumber = useRegisterOnBoardingStore((state) => state.phoneNumber);
  
  const form = useForm<OnBoardingCompanySchema>({
    resolver: zodResolver(onBoardingCOmapnySchema),
    defaultValues: {
      companyName: "",
    },
  });

  useEffect(() => {
    if (!email) {
      router.push("/login");
    }
  }, [email, router]);

  const onSubmit = async (data: OnBoardingCompanySchema) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          email,
          password,
          firstName,
          lastName,
          phone: phoneNumber,
          companyName: data.companyName,
        }
      );
      toast(`${res.data.message}`);
      router.push(`${res.data.data.user.company.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast(`${error.response?.data.error || error.message}`);
      } else {
        toast("Unexpected error, please try again later");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center space-y-3 items-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">Company Information</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[380px] space-y-4"
        >
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Company Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Continue</Button>
        </form>
      </Form>
    </div>
  );
}
