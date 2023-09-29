import React from "react";
import { Alert } from "react-bootstrap";
import "../styles/AlertMessage.css";

function AlertMessage({ message, title, closeAlert, color }) {
  return (
    <Alert variant={color} style={{ width: "42rem" }}>
      <Alert.Heading>
        <div className="alertMessage__close-button">
          <p className="alertMessage--title">{title}</p>
          <button
            className="alertMessage--button"
            onClick={() => {
              closeAlert(true);
            }}
          >
            X
          </button>
        </div>
        <p>{message}</p>
      </Alert.Heading>
    </Alert>
  );
}

export default AlertMessage;
