import React, { useState } from "react";
import "./PasswordGenerator.css";
import logo from "./assets/logo.svg";
export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [password, setPassword] = useState("Click Generate");
  const [strength, setStrength] = useState("Weak");
  const handleChangeLength = (val) => {
    let newLen = length + val;
    if (newLen < 4) newLen = 4;
    if (newLen > 32) newLen = 32;
    setLength(newLen);
  };
  const generatePassword = () => {
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
    let chars = "";
    if (document.getElementById("upper").checked) chars += upper;
    if (document.getElementById("lower").checked) chars += lower;
    if (document.getElementById("numbers").checked) chars += numbers;
    if (document.getElementById("symbols").checked) chars += symbols;
    if (chars === "") {
      alert("Please select at least one character set!");
      return;
    }
    let newPass = "";
    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * chars.length);
      newPass += chars[random];
    }
    setPassword(newPass);
    // Strength check
    if (
      length >= 12 &&
      /[A-Z]/.test(newPass) &&
      /[a-z]/.test(newPass) &&
      /\d/.test(newPass) &&
      /\W/.test(newPass)
    ) {
      setStrength("Very Strong");
    } else if (length >= 8) {
      setStrength("Strong");
    } else {
      setStrength("Weak");
    }
  };
  const copyPassword = () => {
    navigator.clipboard.writeText(password).then(() => {
      alert("Password copied!");
    });
  };
  return (
    <div className="container">
      {/* Left Side */}
      <div className="left">
        <img src={logo} alt="Logo" />
      </div>
      {/* Right Side */}
      <div className="right">
        <h1>Random Password Generator</h1>
        <p>
          Instantly create strong and secure passwords to keep your account safe
          online.
        </p>
        <div className="password-box">
          <div className="password-text">{password}</div>
          <span
            className="strength"
            style={{
              color:
                strength === "Very Strong"
                  ? "green"
                  : strength === "Strong"
                  ? "orange"
                  : "red",
            }}
          >
            {strength}
          </span>
          <button className="copy" onClick={copyPassword}>
            Copy
          </button>
        </div>
        <div className="length-control">
          <label>Password length: </label>
          <button onClick={() => handleChangeLength(-1)}>-</button>
          <span>{length}</span>
          <button onClick={() => handleChangeLength(1)}>+</button>
        </div>
        <div className="checkboxes">
          <label>
            <input type="checkbox" id="upper" defaultChecked /> ABC
          </label>
          <label>
            <input type="checkbox" id="lower" defaultChecked /> abc
          </label>
          <label>
            <input type="checkbox" id="numbers" defaultChecked /> 123
          </label>
          <label>
            <input type="checkbox" id="symbols" defaultChecked /> #@&
          </label>
        </div>
        <button className="copy" style={{ marginTop: "20px" }} onClick={generatePassword}>
          Generate
        </button>
      </div>
    </div>
  );
}