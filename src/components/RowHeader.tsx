function RowHeader () {

  return (
    <div className="grid grid-cols-3 grid-flow-col-dense border-solid border-t-2 border-l-2 border-r-2 border-black ">
        <div
          className="selection:inline-block bg-inherit px-2 cursor-pointer hover:cursor-text hover:font-bold border-r-2 border-solid border-black"
        >Name</div>
      <div className="inline-block px-2 text-right border-r-2 border-solid border-black">Email</div>
      <div className="inline-block text-right px-2 ">Type</div>
    </div>
  );
}

export default RowHeader;
