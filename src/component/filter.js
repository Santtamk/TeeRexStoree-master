import React, { useEffect, useState } from "react";
import "./filter.css";


export default function Filter({ onFilterChange }) {
  const [gender, setGender] = useState(null);
  const [color, setColor] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [type, setType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false)


  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };


  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <=768);
  }

  useEffect(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  },[]);

  const categories = [
    {
      name: "Gender",
      options: ["Men", "Women"],
      state: [gender, setGender],
    },
    {
      name: "Color",
      options: [
        "Black",
        "Pink",
        "Blue",
        "Green",
        "Grey",
        "White",
        "Yellow",
        "Purple",
        "Red",
      ],
      state: [color, setColor],
    },
    {
      name: "Price Range",
      options: ["INR 200 to INR 300", "INR 300 to INR 350", "Above 350"],
      state: [priceRange, setPriceRange],
    },
    {
      name: "Type",
      options: ["Polo", "Hoodie", "Round"],
      state: [type, setType],
    },
  ];
  const handleFilterChange = () => {
    // Pass the selected filter options to the parent component
    onFilterChange({
      gender,
      color,
      priceRange,
      type,
    });
  };

  const handleClearFilter = () => {
    setGender('');
    setColor('');
    setPriceRange('');
    setType('');
    // handleFilterChange();
  };

  return (
//     <>
//       {isMobile && isOpen && (       
//     <div className={`d-flex-col border  rounded-1 bg-light p-4 filterClass `}>
//       <h4 className="px-4">Categories</h4>
      
//       <div className="filter-options">
//       {categories.map((category) => (
//         <div key={category.name} className="m-2 d-flex-col">
//            <h5 className="list-unstyled">{category.name}</h5>
//             <select
//               name={category.name}
//               value={category.state[0]}
//               onChange={(e) => category.state[1](e.target.value)}
//             >
//               <option value="">Select an option</option>
//           {category.options.map((option) => (
//                 <option
//                   className="form-check-input"
//                   type="radio"
//                   name={category.name}
//                   value={option}
//                   checked={category.state[0] === option}
//                 >
//                 {option}
//                 </option>
//           ))}
//           </select>
//         </div>
//       ))}
//       </div>
//       <div className="d-flex align-items-start">

//         <button
//             type="button"
//             class="btn btn-dark"
//             onClick={() => {
//               handleClearFilter();
//               handleFilterChange();
//             }}
//           >
//             Apply
//         </button>

//         <button
//             type="button"
//             class="btn btn-dark"
//             onClick={() => {
//               handleClearFilter();
//               handleFilterChange();
//             }}
//           >
//             Clear
//         </button>
//       </div>
//     </div>
// )}
//       <button className="filter__button" onClick={toggleFilter}>
//         {isOpen ? "Close Filter" : "Open Filter"}
//       </button>
//     </>

<div className="filter-container">
      <button className="filter__button" onClick={toggleFilter}>
        {isOpen ? "Close Filter" : "Open Filter"}
      </button>

      {isMobile && isOpen && (
        <div className="filter-content">
          <h4 className="px-4">Categories</h4>
          <div className="filter-options">
            {categories.map((category) => (
              <div key={category.name} className="m-2 d-flex-col">
                <h5 className="list-unstyled">{category.name}</h5>
                <select
                  name={category.name}
                  value={category.state[0]}
                  onChange={(e) => category.state[1](e.target.value)}
                >
                  <option value="">Select an option</option>
                  {category.options.map((option) => (
                    <option
                      className="form-check-input"
                      type="radio"
                      name={category.name}
                      value={option}
                      checked={category.state[0] === option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="d-flex align-items-start">
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => {
                handleClearFilter();
                handleFilterChange();
              }}
            >
              Apply
            </button>

            <button
              type="button"
              className="btn btn-dark"
              onClick={() => {
                handleClearFilter();
                handleFilterChange();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
      <div className="d-flex-col border  rounded-1 bg-light p-4 filterClass categories">
          <h4 className="px-4">Categories</h4>
          <div className="filter-options justify-content-around">
            {categories.map((category) => (
              <div key={category.name} className="m-2 d-flex-col">
                <h5 className="list-unstyled">{category.name}</h5>
                <select
                  name={category.name}
                  value={category.state[0]}
                  onChange={(e) => category.state[1](e.target.value)}
                >
                  <option value="">Select an option</option>
                  {category.options.map((option) => (
                    <option
                      className="form-check-input"
                      type="radio"
                      name={category.name}
                      value={option}
                      checked={category.state[0] === option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center gap-3" >
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => {
                handleClearFilter();
                handleFilterChange();
              }}
            >
              Apply
            </button>

            <button
              type="button"
              className="btn btn-dark"
              onClick={() => {
                handleClearFilter();
                handleFilterChange();
              }}
            >
              Clear
            </button>
          </div>
        </div>
    </div>
  );
}
