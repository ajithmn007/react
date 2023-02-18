import styles from "./Cart.module.css";
import { BiRupee } from "react-icons/bi";
import Modal from "../UI/Modal";
import CartContext from "../../Store/cart-Context";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

/* const AWS = require('aws-sdk');
AWS.config.update({
  region: 'ap-south-1'
})
 var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});  */

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [orderedStatus, setOrderedStatus] = useState(false)
  const [error, setError] = useState(null)

  const onAddItemHandler = (item) => {
    cartContext.addItem({...item, amount:1})   
  };

  const onRemoveItemHandler = (id)=> {
    cartContext.removeItem(id)
  };

  const orderHandler = (event) => {
    setIsCheckout(true)
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmit(true)
    const uniqueNumber = Math.floor(Math.random()*10000).toString()
    const Item = {'id':  uniqueNumber,
        'userDetails':  JSON.stringify(userData),
        'orderDetails': JSON.stringify(cartContext.items),
        'totalAmount': cartContext.totalAmount.toString()
      }
      
    try{
      const response = await fetch('https://t1l0fxwygd.execute-api.ap-south-1.amazonaws.com/prd/',
      {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(Item),
      })

      if (!response.ok){
        throw new Error('Something went wrong!');
      }
      cartContext.resetItem();
    }
    catch (error){
      setError(true)
      console.log(error.message)
      return;
    }
    //custom event listeners  
    let c_event = new CustomEvent("customClear");
    window.dispatchEvent(c_event);

    setIsSubmit(false)
    setOrderedStatus(true)
    /* var params = {
      TableName: 'UserDetails',
      Item: {
        'id':  {S: uniqueNumber},
        'userDetails':  {S:  JSON.stringify(userData)},
        'orderDetails': {S: JSON.stringify(cartContext.items)},
        'totalAmount': {S: cartContext.totalAmount.toString()}
      }  
    };
 
    // Call DynamoDB to add the item to the table
    ddb.putItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
        setError(true)
      } else {
        console.log("Success", data);
        cartContext.resetItem();
      }
    }); */
}

  const totalAmount = `${cartContext.totalAmount}`;
  const hasItems = cartContext.items.length > 0;
  const CartItems = (
    <ul className={`${styles["cart-items"]} ${isCheckout && styles.cart_checkout}`}>
      {cartContext.items.map((item) => (
        <CartItem
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={onAddItemHandler.bind(null,item)}
          onRemove={onRemoveItemHandler.bind(null,item.id)}
          key={item.id}
        />
      ))}
    </ul>
  );

  const modalActions = <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onCloseModal}>
          Close
        </button>
        {hasItems && (
          <button className={styles.order} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>

  const successOrders =    
      <div className={styles.actions}>
        <p className={styles.paragraph}>Successfully submitted your orders</p>
        <button className={styles["button--alt"]} onClick={props.onCloseModal}>
          Close
        </button>
      </div>
   

  const failedOrders =  <div className={styles.actions}>
        <p className={styles.paragraph}>Error while posting orders</p>
        <p className={styles.paragraph}>Please try after some time.</p>
        <button className={styles["button--alt"]} onClick={props.onCloseModal}>
          Close
        </button>
      </div>

  const submitModalActions = 
    <>
      {CartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>
          <span className={styles.price}>
            <BiRupee/>
          </span>
          <span>{totalAmount}</span>
        </span>
      </div>
      {isCheckout && hasItems && <Checkout onCancel={props.onCloseModal} onConfirm={submitOrderHandler}/>}
      {!isCheckout && modalActions}
    </>
    
  return (
    <Modal onCloseModal={props.onCloseModal}>
      {!isSubmit && !orderedStatus && submitModalActions}
      {isSubmit && !orderedStatus && <p className={styles.paragraph}>Submitting your orders...</p>}
      {orderedStatus &&  !error && successOrders }
      {error && failedOrders}
    </Modal>
  );
};

export default Cart;
