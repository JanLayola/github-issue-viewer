'use client'

import { ChangeEvent, ReactNode, useState } from "react";

import styles from "./TextInputComponent.module.css";

export interface NavbarComponentProps {
  handleAction: (value: string) => void;
}

const TextInputComponent = ({ handleAction }: NavbarComponentProps): ReactNode => {
  const [ value, setValue ] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = event.target.value;

    setValue(inputValue)
  }

  const handleKeyPress = (event: { key: any }) => {
    if (event.key === "Enter") return handleAction(value)
  }

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        placeholder='organitzation/repository'
        className={styles.input}
        value={value ?? ""}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <div onClick={() => handleAction(value)} className={styles.inputIcon}>search</div>
    </div>

  )
}

export default TextInputComponent;