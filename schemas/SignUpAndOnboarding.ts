import z from "zod";

export const signUpandOnBoardingSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firebaseuid: z.string(),
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string(),
  phoneNumber: z.string().nonempty("Phone number is required"),
  terms: z
    .boolean()
    .refine((value) => value, { message: "You must agree to the terms" }),
  marketing: z.boolean(),
  companyName: z.string().nonempty("Company name is required"),
});

export type signUpandOnBoardingSchema = z.infer<
  typeof signUpandOnBoardingSchema
>;
