import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Filter from "./filter";
// import Grid from '@mui/material/Grid';
import './Products.css';

const Products = ({ handleClick }) => {

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    gender: '',
    color: '',
    priceRange: '',
    type: '',
  });

  const getProducts = async () => {
    try {
      const res = await axios.get(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      );
      const updatedProducts = res.data.map((product) => ({
        ...product,
        quantity: 1, // Set default quantity to 1 for each product
        quantityLimit: product.quantity, // Set the apiQuantityLimit to the 'quantity' property from the API response
      }));
      setProducts(updatedProducts);
    } catch (error) {
      console.error("getProducts error:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);


  const handleFilterChange = (options) => {
    setFilterOptions(options);
  };

  const filteredProducts = products.filter((product) => {

    const nameMatches = product.name.toLowerCase().includes(searchTerm.toLowerCase());

    const genderMatches =!filterOptions.gender || product.gender === filterOptions.gender;

    const colorMatches =!filterOptions.color || product.color === filterOptions.color;

    const priceMatches =
      !filterOptions.priceRange ||
      (filterOptions.priceRange === "INR 200 to INR 300" &&
        product.price >= 200 &&
        product.price <= 300) ||
      (filterOptions.priceRange === "INR 300 to INR 350" &&
        product.price >= 300 &&
        product.price <= 350) ||
      (filterOptions.priceRange === "Above 350" && product.price > 350);

    const typeMatches =
      !filterOptions.type || product.type === filterOptions.type;

    return (
       nameMatches && genderMatches && colorMatches && priceMatches && typeMatches
    );
  });

  return (
    <>
      <Box
        className=" d-flex justify-content-centre search"
        sx={{
          width: 500,
          maxWidth: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <TextField
          fullWidth
          label="Search"
          id="fullWidth"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <div>
        <div className="container d-flex products-and-categories">

          <div className="product-filter" >
            <Filter onFilterChange={handleFilterChange} />
          </div>

          <div className="row m-4 d-flex flex-wrap"  >
            {filteredProducts.map((product) => (
              <div key={product.id} className="col m-2">
                <Card product={product} handleClick={handleClick} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Products;
