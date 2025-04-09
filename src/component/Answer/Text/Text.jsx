import React, { useState } from "react";
import debounce from "lodash.debounce";
import styles from "./styles";


export const Text = (props) => {
  const textInput = props.v?.list?.[0]?.name;

  console.log(textInput, "QQQQQQQQQQQQQQQQQQ");
  const initialText = textInput;
  const [textValue, setTextValue] = useState(initialText);
  const handleChange = (event) => {
    const newValue = event.target.value;
    setTextValue();

   

    // Вызываем дебаунс только для изменения состояния Redux
    debouncedChange(newValue);
  };
  const debouncedChange = React.useCallback(
    debounce((newValue) => {
      if(props.onChange){
        props.onChange(newValue)
      }
    }, 3000),
    []
  );
  return (
    <div style={styles.textContent}>
      <h2 style={styles.textPrimary}>{props.v.name}:</h2>
      <textarea
      style={styles.textFrom}
        value={textValue}
        name="text"
        
        onChange={handleChange}
        onInput={(e) => {
          e.target.style.height = "20px"; // Сброс высоты
          e.target.style.height = `${e.target.scrollHeight}px`; // Установка высоты на основе прокрутки
        }}
        // onClick={(e) => {
        //   e.target.style.minHeight = "20px"; // Сброс высоты
        //   e.target.style.height = `${e.target.scrollHeight}px`; // Установка высоты на основе прокрутки
        // }}
      ></textarea>
    </div>
  );
};
