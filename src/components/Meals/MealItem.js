import { useRef, useState, useEffect } from "react";
import { BiRupee } from "react-icons/bi";
import styles from "./MealItem.module.css";
import Input from '../UI/Input'
import { useContext } from "react";
import CartContext from '../../Store/cart-Context'

const MealItem = (props) => {
  const amountRef= useRef();
  const [amountIsValid, setAmountIsValid]= useState(true);
  const price = `${props.price}`;
  useEffect (()=>{
    window.addEventListener('customClear', ()=>{
      amountRef.current.value=1
    })
  },[])
  
  const cartContext = useContext(CartContext)

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount =+ amountRef.current.value
    if (enteredAmount<1 || enteredAmount.length===0 || enteredAmount>5){
      setAmountIsValid(false)
      return;
    }
    cartContext.addItem({
      amount: enteredAmount,
      price: props.price,
      name: props.name,
      id: props.id
    })
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <span className={styles.rupee}><BiRupee/></span>
        <span className={styles.price}>{price}</span>
      </div>

      <form onSubmit={submitHandler} className={styles.form}>
        <Input label= 'Amount' 
          ref= {amountRef}
          input={{
            type: "number",
            id: "amount",
            min: "1",
            max: "5",
            step: "1",
            defaultValue: 1,
           
          }}
        />

        <button type="submit">+ Add</button>
        {!amountIsValid && <p className={styles.error_text}>Please enter a number from (1-5).</p>}
      </form>
    </li>
  );
};

export default MealItem;
