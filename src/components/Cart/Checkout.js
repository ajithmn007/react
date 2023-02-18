import styles from "./Checkout.module.css";

import useInput from "../../Hooks/useInput";

const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length !== 6 ;

const Checkout = (props) => {
  const {
    input: nameInput,
    inputError: nameInputError,
    isFieldError: nameFieldIsError,
    reset: resetName,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
  } = useInput(isEmpty);

  const {
    input: streetInput,
    inputError: streetInputError,
    isFieldError: streetFieldIsError,
    reset: resetStreet,
    inputChangeHandler: streetInputChangeHandler,
    inputBlurHandler: streetInputBlurHandler,
  } = useInput(isEmpty);

  const {
    input: cityInput,
    inputError: cityInputError,
    isFieldError: cityFieldIsError,
    reset: resetCity,
    inputChangeHandler: cityInputChangeHandler,
    inputBlurHandler: cityInputBlurHandler,
  } = useInput(isEmpty);

  const {
    input: postalCodeInput,
    inputError: postalCodeInputError,
    isFieldError: postalCodeFieldIsError,
    reset: resetPostalCode,
    inputChangeHandler: postalCodeInputChangeHandler,
    inputBlurHandler: postalCodeInputBlurHandler,
  } = useInput(isSixChars);

  let formIsNotValid = false

  if (nameInputError || streetInputError || postalCodeInputError || cityInputError){
    formIsNotValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    nameInputBlurHandler();
    cityInputBlurHandler();
    postalCodeInputBlurHandler();
    streetInputBlurHandler();

    if(formIsNotValid){
      return
    }
    props.onConfirm({
      name: nameInput,
      street: streetInput,
      city: cityInput,
      postalCode: postalCodeInput
    })
    resetCity();
    resetName();
    resetPostalCode();
    resetStreet();
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={`${styles.control} ${nameFieldIsError ? styles.invalid : ''}`}>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={nameInput}
        />
        {nameFieldIsError && <p className= {styles['invalid-text']}>Name field should not be Empty!</p>}
      </div>
      <div className={`${styles.control} ${streetFieldIsError ? styles.invalid : ''}`}>
        <label htmlFor="street">Street</label>
        <input
          id="street"
          type="text"
          onChange={streetInputChangeHandler}
          value={streetInput}
          onBlur={streetInputBlurHandler}
        />
        {streetFieldIsError && <p className= {styles['invalid-text']}>Street field should not be Empty!</p>}
      </div>
      <div className={`${styles.control} ${cityFieldIsError ? styles.invalid : ''}`}>
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
          value={cityInput}
        />
        {cityFieldIsError && <p className= {styles['invalid-text']}>City field should not be Empty!</p>}
      </div>
      <div className={`${styles.control} ${postalCodeFieldIsError ? styles.invalid : ''}`}>
        <label htmlFor="postal code">Postal Code</label>
        <input
          id="postal code"
          type="number"
          onChange={postalCodeInputChangeHandler}
          onBlur={postalCodeInputBlurHandler}
          value={postalCodeInput}
        />
        {postalCodeFieldIsError && <p className= {styles['invalid-text']}>Postal code field should contain six digits!</p>}
      </div>
      <div className={styles.actions}>
        <button type="submit" className="submit" >
          Submit
        </button>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Checkout;
