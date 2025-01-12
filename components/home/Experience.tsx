"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

const Experience = () => {
  // State to track the selected button (index or identifier)
  const [selected, setSelected] = useState<number | null>(null);

  // Array of emoji for easier mapping
  const emojis = ["😞", "☹️", "😌", "😄", "😍"];

  return (
    <div className="bg-primary/10 p-4 border rounded-md space-y-2 w-full">
      <h2 className="text-lg font-semibold">Rate Your Experience</h2>
      <div className="flex justify-between p-6">
        {emojis.map((emoji, index) => (
          <Button
            key={index}
            className={`text-3xl rounded-md px-4 py-2 font-semibold ${
              selected === index
                ? "bg-primary text-white" // Red background for selected button
                : "bg-transparent  border-primary text-primary" // Outline variant for unselected buttons
            }`}
            onClick={() => setSelected(index)} // Update the selected button
          >
            {emoji}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Experience;
