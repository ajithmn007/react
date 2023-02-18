import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCart.module.css";
import React, { useContext, useState, useEffect } from "react";
import CartContext from "../../Store/cart-Context";

const HeaderCart = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartContext = useContext(CartContext);
  const { items } = cartContext;

  const countOfCartItems = cartContext.items.reduce((currentValue, items) => {
    return currentValue + items.amount;
  }, 0);
  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ""}`;
  props.oderSuccessMessage(btnIsHighlighted);
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onShowCart}>
      <span className={styles.bump}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={styles.badge}>{countOfCartItems}</span>
    </button>
  );
};

export default HeaderCart;
