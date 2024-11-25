
import React from "react";

interface CustomSpinnerProps {
  size: number;
  color: string;
}

const CustomSpinner: React.FC<CustomSpinnerProps> = ({ size, color }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `4px solid ${color}`,
        borderRadius: "50%",
        borderTop: "4px solid transparent",
        animation: "spin 1s linear infinite",
      }}
    />
  );
};

export default CustomSpinner;
