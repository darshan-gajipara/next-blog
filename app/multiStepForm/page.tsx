"use client";

import StepOne from "@/components/StepOne";
import StepTwo from "@/components/StepTwo";
import { useForm, FormProvider } from "react-hook-form";

export default function MultiStepForm() {
  const methods = useForm();
  const onSubmit = (data: unknown) => {
    console.log("Multi-step data:", data);
  };

  return (
    <>
    <FormProvider {...methods}>
        <h1>Form Provider Example</h1>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <StepOne />
        <StepTwo />
        <button type="submit" className="bg-green-500 text-white p-2 mt-4">
          Submit All
        </button>
      </form>
    </FormProvider>
    </>
  );
}
