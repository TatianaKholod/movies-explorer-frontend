//хук управления формой и валидации формы
import { useState, useCallback } from 'react';
import * as validator from 'validator';

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    if (target.type === 'email' && !validator.isEmail(value)) {
      setErrors({ ...errors, [name]: 'Некорректный email' });
      setIsValid(false);
    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
      setIsValid(target.closest('form').checkValidity());
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}
