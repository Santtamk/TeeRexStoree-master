import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import './cart.css'
import  Emptycart  from '.././asset/emptycart.svg.png'

const Cart = ({ cart, setCart }) => {
  const [price, setPrice] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const handlePrice = () => {
    let cash = 0;
    cart.forEach((product) => {
      cash += product.price * product.quantity;
    });
    setPrice(cash);
  };
  useEffect(() => {
    handlePrice();
  }, [cart]);

  const handleIncrement = (product) => {
    if (product.quantity < product.quantityLimit) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      enqueueSnackbar("Max quantity reached", {
        variant: "warning",
      });
    }
  };

  const handleDecrement = (product) => {
    const updatedCart = cart.map((item) =>
      item.id === product.id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  const handleDelete = (id) => {
    const arr = cart.filter((product) => product.id !== id);
    setCart(arr);
  };



return (
  <>
  {cart.length === 0 ? (
    // Render the empty cart image when the cart is empty
    <div className="empty-cart d-flex justify-content-center flex-column" >
      <img src={Emptycart} className="img-fluid img-thumbnail mx-auto d-block" alt="Empty Cart" />
      <h3 className="text-center">Your cart is empty.</h3>
    </div>
  ) : (
  <div className="container mt-5 mb-5">
  <div className="d-flex justify-content-center row">
      <div className="col-md-8">
          <div className="p-2">
              <h4>Shopping cart</h4>
          </div>
          {cart?.map((product) => (
          <div className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
              <div className="mr-1"><img className="rounded" src={product.imageURL}alt={product.name} width="70"/></div>
              <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">{product.name}</span>
                  
              </div>
              <div className="d-flex flex-row align-items-center qty">
              <button onClick={() => handleIncrement(product)}> + </button>
               <button> {product.quantity} </button>
               <button onClick={() => handleDecrement(product)}> - </button>
              </div>
              <div>
                  <h5 className="text-grey">{product.price}</h5>
              </div>
              <div className="d-flex align-items-center"><button
                className="btn btn-danger mt-2"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button></div>
          </div>
          ))}
                    <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded">Total  :  {price}</div>
          <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><button className="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button">Proceed to Pay(coming soon)</button></div>
      </div>
  </div>
</div>
)}
</>
    )
}
export default Cart;
