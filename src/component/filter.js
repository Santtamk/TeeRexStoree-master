import React, { useEffect, useState } from "react";
import "./filter.css";
import { Alert, Snackbar } from "@mui/material";


export default function Filter({ onFilterChange }) {
  const [gender, setGender] = useState(null);
  const [color, setColor] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [type, setType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  


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
      options: ["Polo", "Hoodie", "Basic"],
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
  };

  //snackbarmUI

  const [applySnackbarOpen, setApplySnackbarOpen] = useState(false);
  const [clearSnackbarOpen, setClearSnackbarOpen] = useState(false);
  
    const handleClickApply = () => {
      setApplySnackbarOpen(true);
      handleFilterChange()
    };
  
    const handleClickClear  = () => {
       handleClearFilter();
      handleFilterChange();
      setClearSnackbarOpen(true);
    };
  

  return (


<div className="filter-container">
      <button type="button" className="filter__button btn btn-dark" onClick={toggleFilter}>
        {isOpen ? "Close Filter" : "Open Filter"}
      </button>

      {isMobile && isOpen && (
        <div className="mobile-filter-content">
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
          <div className="d-flex align-items-start gap-2">
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleClickApply}
            >
              Apply
            </button>
            <Snackbar
              open={applySnackbarOpen}
              autoHideDuration={500} 
              onClose={() => setApplySnackbarOpen(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center'  }} 
            >
              <Alert
                onClose={() => setApplySnackbarOpen(false)}
                severity="success" 
                sx={{ width: '100%' }}
              >
                Filter Applied!!
              </Alert>
            </Snackbar>
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleClickClear}
            >
              Clear
            </button>
            <Snackbar
              open={clearSnackbarOpen}
              autoHideDuration={500} 
              onClose={() => setClearSnackbarOpen(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center'  }} 
            >
              <Alert
                onClose={() => setClearSnackbarOpen(false)}
                severity="success" 
                sx={{ width: '100%' }}
              >
                Filter Cleared!!
              </Alert>
            </Snackbar>
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
              onClick={handleClickApply}
            >
              Apply
            </button>
            <Snackbar
              open={applySnackbarOpen}
              autoHideDuration={500} 
              onClose={() => setApplySnackbarOpen(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center'  }} 
            >
              <Alert
                onClose={() => setApplySnackbarOpen(false)}
                severity="success" 
                sx={{ width: '100%' }}
              >
                Filter Applied!!
              </Alert>
            </Snackbar>

            <button
              type="button"
              className="btn btn-dark"
              onClick={handleClickClear}
            >
              Clear
            </button>
            <Snackbar
              open={clearSnackbarOpen}
              autoHideDuration={500} 
              onClose={() => setClearSnackbarOpen(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center'  }} 
            >
              <Alert
                onClose={() => setClearSnackbarOpen(false)}
                severity="success" 
                sx={{ width: '100%' }}
              >
                Filter Cleared!!
              </Alert>
            </Snackbar>
          </div>
        </div>
    </div>
  );
}
