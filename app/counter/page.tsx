"use client";
import { useCounterStore } from "../store/useCounterStore";

export default function Home() {
  const { count, increase, decrease, reset } = useCounterStore();

  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <h1 className="text-2xl font-bold">Counter with Zustand</h1>
      <p className="text-xl">Count: {count}</p>
      
      <div className="flex gap-3">
        <button onClick={increase} className="bg-green-500 px-3 py-1 rounded text-white">
          +
        </button>
        <button onClick={decrease} className="bg-red-500 px-3 py-1 rounded text-white">
          -
        </button>
        <button onClick={reset} className="bg-gray-500 px-3 py-1 rounded text-white">
          Reset
        </button>
      </div>
    </div>
  );
}
