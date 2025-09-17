"use client";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputField } from "@/components/InputField";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string().min(6, "Min 6 chars").required(),
});

export default function ValidatedForm() {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: unknown) => {
    console.log("Validated:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InputField name="email" label="Email" />
        <InputField name="password" label="Password" type="password" />
        {methods.formState.errors.email && (
          <p className="text-red-500">{methods.formState.errors.email.message}</p>
        )}
        {methods.formState.errors.password && (
          <p className="text-red-500">{methods.formState.errors.password.message}</p>
        )}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
