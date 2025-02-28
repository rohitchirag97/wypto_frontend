import { signUpandOnBoardingSchema } from "@/schemas/SignUpAndOnboarding";
import { create } from "zustand";

type RegisterandOnboardingState = Partial<signUpandOnBoardingSchema> & {
  setData: (data: Partial<signUpandOnBoardingSchema>) => void;
};

export const useRegisterOnBoardingStore = create<RegisterandOnboardingState>()(
  (set) => ({
    setData: (data) => set(data),
  })
);
