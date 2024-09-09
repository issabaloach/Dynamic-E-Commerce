function CategoryChip({ category, isChosen, onClick }) {
    const { name } = category;
    return (
      <div
        onClick={onClick}
        className={`${
          isChosen ? "bg-blue-400 text-white" : "bg-white text-black"
        } p-2 
          cursor-pointer
          hover:bg-blue-100
          border-blue-400 border px-4 rounded-full`}
      >
        <h1>{name}</h1>
      </div>
    );
  }


  
  export default CategoryChip;