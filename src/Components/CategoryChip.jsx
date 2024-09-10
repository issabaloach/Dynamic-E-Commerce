import { useContext } from "react";
import Button from "./Button";

function CategoryChip({ category, isChosen, onClick }) {
  const { name } = category;
  return (
    <Button
      label={name}
      onClick={onClick}
      borderColor={isChosen ? "border-black" : "border-blue-400"}
      txtColor={isChosen ? "text-black" : "text-gray-600"}
    />
  );
}

export default CategoryChip;
