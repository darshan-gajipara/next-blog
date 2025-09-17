"use client";

import { useFormContext } from "react-hook-form";

export default function StepOne() {
  const { register } = useFormContext();
  return (
    <div className="mb-4">
      <h2 className="font-bold">Step 1: Personal Info</h2>
      <input
        {...register("firstName")}
        placeholder="First Name"
        className="border p-1 block my-2"
      />
      <input
        {...register("lastName")}
        placeholder="Last Name"
        className="border p-1 block"
      />
    </div>
  );
}
