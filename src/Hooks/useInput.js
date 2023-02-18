import { useState } from "react";

const useInput = (validationLogic) => {
  const [input, setInput] = useState('');
  const [isTouched, setIsTouched] = useState(false)

  const inputError = validationLogic(input);
  const isFieldError = isTouched && inputError

  const inputChangeHandler = event => {
    setInput(event.target.value)
  }

  const inputBlurHandler = () =>{
    setIsTouched(true)
  }

  const reset = () => {
    setInput('')
    setIsTouched(false)
  }

  return {input, inputError, isFieldError, isTouched, reset, inputChangeHandler, inputBlurHandler}
};

export default useInput;