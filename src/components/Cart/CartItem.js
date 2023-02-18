import styles from './CartItem.module.css'
import { BiRupee } from 'react-icons/bi';
const CartItem = props => {
    const price = `${props.price}`
    
    return (
        <li className={styles['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={styles.summary}>
        <span>
          <span className={styles.rupee}><BiRupee/></span>
          <span className={styles.price}>{price}</span>
        </span>
          

          <span className={styles.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
    )
};

export default CartItem;