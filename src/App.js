import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './component/header';
import Products from './component/products';
import { useSnackbar } from "notistack";
import Cart from './component/cart';

function App() {
  const [cart, setCart] = useState([]);
  const [show, setShow] = useState(true);
  const {enqueueSnackbar} = useSnackbar();


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  
  const handleClick = (item) => {
    // Check if the item is already in the cart
    const isPresent = cart.some((product) => item.id === product.id);
  
    if (isPresent) {
      enqueueSnackbar("Item already in cart. Use the cart sidebar to update quantity or remove item.", {
        variant: "warning",
      });
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      setCart(updatedCart);
  
      // Show a success notification
      enqueueSnackbar("Item added to cart.", {
        variant: "success",
      });
    }
  };


  
  return (
    <React.Fragment>
      <Header size={cart.length} setShow={setShow}/>
      {
        show ? <Products handleClick={handleClick}/> : <Cart cart={cart} setCart={setCart}  />
      }
      </React.Fragment>
  );
}

export default App;
