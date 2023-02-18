import "./App.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./Store/CartProvider";
import Footer from "./components/Layout/Footer";
import { useState } from "react";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onCloseModal={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <Meals />
      <Footer />
    </CartProvider>
  );
}

export default App;
