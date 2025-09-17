"use client";

import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  type?: string;
}

export const InputField = ({ name, label, type = "text" }: Props) => {
  const { register } = useFormContext();

  return (
    <div className="mb-4">
      <label className="block">{label}</label>
      <input
        {...register(name, { required: `${label} is required` })}
        type={type}
        className="border px-2 py-1 w-full"
      />
    </div>
  );
};
