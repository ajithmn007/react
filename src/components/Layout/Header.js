import styles from "./Header.module.css";
import MealsImage from "../../Assets/meals.jpg";
import HeaderCart from "./HeaderCart";
import { useState } from "react";

const Header = (props) => {
  const [orderMessage, setOrderMessage] = useState(null);
  const orderMessageHandler = (value) => {
    setOrderMessage(value);
  };

  return (
    <>
      <header className={styles.header}>
        <h1>Meals</h1>
        <HeaderCart
          onShowCart={props.onShowCart}
          oderSuccessMessage={orderMessageHandler}
        />
      </header>
      {orderMessage && (
        <div className={styles["order-success"]}>
          Order added succesfully...
        </div>
      )}
      <figure className={styles.image}>
        <img src={MealsImage} alt="Full of Meals" title="Full of Meals"></img>
      </figure>
    </>
  );
};

export default Header;
