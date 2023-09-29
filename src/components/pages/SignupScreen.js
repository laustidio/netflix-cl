import React, { useRef, useState } from "react";
import "../styles/SignupScreen.css";
import { auth } from "../../firebase";
import AlertMessage from "../alerts/AlertMessage";
import { Modal } from "react-bootstrap";

function SignupScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [showAlert, setShowAlert] = useState(false);
  const handleCloseAlert = () => setShowAlert(false);
  const handleShowAlert = () => setShowAlert(true);

  const [messageAlert, setMessageAlert] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [messageTitle, setMessageTitle] = useState("");

  const register = (e) => {
    e.preventDefault();

    if (emailRef.current.value !== "" && passwordRef.current.value !== "") {
      auth
        .createUserWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        .then(() => {
          handleCloseAlert(true);
        })
        .catch((error) => {
          setMessageTitle("Oops! It seems there was an error to sign up!");
          setMessageAlert(
            `Sorry, the email address is already in use by another account.`
          );
          handleShowAlert(true);
          setAlertColor("danger");
        });
    } else if (
      emailRef.current.value === "" ||
      passwordRef.current.value === ""
    ) {
      setAlertColor("danger");
      setMessageTitle("Oops! It seems there was an error to sign up!");
      setMessageAlert(
        `Sorry! There was an error with your email and password. 
        Please make sure they are correct and try again.`
      );
      handleShowAlert(true);
    } else {
      handleCloseAlert(true);
    }
  };

  const signIn = (e) => {
    e.preventDefault();
    if (emailRef.current.value !== "" && passwordRef.current.value !== "") {
      auth
        .signInWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        .then(() => {
          handleCloseAlert(true);
        })
        .catch((error) => {
          setMessageTitle("Oops! It seems there was an error to sign in!");
          setMessageAlert(
            `Sorry, but you do not
            have any acount registered with this email ${emailRef.current.value},
            please, try another or creat your account.`
          );
          setAlertColor("danger");
          handleShowAlert(true);
          console.log(error.message);
        });
    } else if (
      emailRef.current.value === "" ||
      passwordRef.current.value === ""
    ) {
      setMessageTitle("Oops! It seems there was an error to sign in!");
      setMessageAlert(
        `Please, enter a valid email and password to sign in.
        Please make sure they are correct and try again.`
      );
      setAlertColor("danger");
      handleShowAlert(true);
    } else {
      handleCloseAlert(true);
    }
  };

  return (
    <div className={`signupScreen`}>
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>

        <h4>
          <span className="signupScreen__gray">New to Netflix? </span>
          <span className="signupScreen__link" onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
      {showAlert && (
        <Modal show={showAlert} onHide={handleCloseAlert}>
          <AlertMessage
            closeAlert={handleCloseAlert}
            message={messageAlert}
            title={messageTitle}
            color={alertColor}
          />
        </Modal>
      )}
    </div>
  );
}

export default SignupScreen;
