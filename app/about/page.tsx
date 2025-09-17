"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// JSON data
const countryData = {
    countries: [
        {
            id: 1,
            name: "India",
            code: "IN",
            states: [
                {
                    id: 101,
                    name: "Maharashtra",
                    cities: [
                        { id: 1001, name: "Mumbai" },
                        { id: 1002, name: "Pune" },
                        { id: 1003, name: "Nagpur" },
                    ],
                },
                {
                    id: 102,
                    name: "Gujarat",
                    cities: [
                        { id: 1101, name: "Ahmedabad" },
                        { id: 1102, name: "Surat" },
                        { id: 1103, name: "Vadodara" },
                    ],
                },
            ],
        },
        {
            id: 2,
            name: "United States",
            code: "US",
            states: [
                {
                    id: 201,
                    name: "California",
                    cities: [
                        { id: 2001, name: "Los Angeles" },
                        { id: 2002, name: "San Francisco" },
                        { id: 2003, name: "San Diego" },
                    ],
                },
                {
                    id: 202,
                    name: "Texas",
                    cities: [
                        { id: 2101, name: "Houston" },
                        { id: 2102, name: "Dallas" },
                        { id: 2103, name: "Austin" },
                    ],
                },
            ],
        },
        {
            id: 3,
            name: "Canada",
            code: "CA",
            states: [
                {
                    id: 301,
                    name: "Ontario",
                    cities: [
                        { id: 3001, name: "Toronto" },
                        { id: 3002, name: "Ottawa" },
                        { id: 3003, name: "Mississauga" },
                    ],
                },
                {
                    id: 302,
                    name: "British Columbia",
                    cities: [
                        { id: 3101, name: "Vancouver" },
                        { id: 3102, name: "Victoria" },
                        { id: 3103, name: "Kelowna" },
                    ],
                },
            ],
        },
    ],
};


// ✅ Yup schema
const schema = yup.object({
    country: yup.string().required("Country is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
});

type FormValues = yup.InferType<typeof schema>;

export default function CountryStateForm() {
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [selectedState, setSelectedState] = useState<string>("");

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FormValues) => {
        console.log("Form Data:", data);
    };

    // Watch selected country
    const countryId = watch("country");
    const stateId = watch("state");

    // States for selected country
    const states =
        countryData.countries.find((c) => String(c.id) === countryId)?.states || [];

    const cites = states.find((c) => String(c.id) === stateId)?.cities || [];

    return (
        <>
            <form id="countryForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
                {/* Country Select */}
                <div>
                    <label className="block mb-1">Country</label>
                    <select
                        {...register("country")}
                        className="w-full border rounded p-2"
                        onChange={(e) => {
                            setValue("country", e.target.value, { shouldValidate: true });
                            setSelectedCountry(e.target.value);
                            setValue("state", ""); // reset state when country changes
                        }}
                    >
                        <option value="">-- Select a country --</option>
                        {countryData.countries.map((country) => (
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                    {errors.country && (
                        <p className="text-red-500 text-sm">{errors.country.message}</p>
                    )}
                </div>

                {/* State Select */}
                <div>
                    <label className="block mb-1">State</label>
                    <select
                        {...register("state")}
                        className="w-full border rounded p-2"
                        disabled={!selectedCountry}
                        onChange={(e) => {
                            setValue("state", e.target.value, { shouldValidate: true });
                            setSelectedState(e.target.value);
                            setValue("city", ""); // reset state when country changes
                        }}
                    >
                        <option value="">-- Select a state --</option>
                        {states.map((state) => (
                            <option key={state.id} value={state.id}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                    {errors.state && (
                        <p className="text-red-500 text-sm">{errors.state.message}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1">City</label>
                    <Select
                        onValueChange={(value) =>
                            setValue("city", value, { shouldValidate: true })
                        }
                        disabled={!selectedState}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="select city" />
                        </SelectTrigger>
                        <SelectContent>
                            {cites.map((city) => (
                                <SelectItem key={city.id} value={String(city.id)}>
                                    {city.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.city && (
                        <p className="text-red-500 text-sm">{errors.city.message}</p>
                    )}
                </div>

            </form>
            <button
                type="submit"
                form="countryForm"
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Submit
            </button>
        </>
    );
}
