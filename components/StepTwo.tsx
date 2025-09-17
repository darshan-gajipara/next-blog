"use client";

import { useFormContext } from "react-hook-form";

export default function StepTwo() {
  const { register } = useFormContext();
  return (
    <div className="mb-4">
      <h2 className="font-bold">Step 2: Contact Info</h2>
      <input
        {...register("email")}
        placeholder="Email"
        className="border p-1 block my-2"
      />
      <input
        {...register("phone")}
        placeholder="Phone"
        className="border p-1 block"
      />
    </div>
  );
}
