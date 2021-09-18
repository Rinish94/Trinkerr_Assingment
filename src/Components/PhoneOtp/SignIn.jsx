import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import "firebase/auth";
//components
// import SignIn from "./Components/PhoneOtp/SignIn";
// import Home from "./Components/PhoneOtp/Home";

const SignIn = () => {
  const [viewOtpForm, setViewOtpForm] = useState(false);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);
  let [login, setLogin] = useState(false);
  const [names, setNames] = useState("");
  const history = useHistory();
  const localData = JSON.parse(localStorage.getItem("auth")) || undefined;
  localData && history.push("/home");
  const firebaseConfig = {
    apiKey: "AIzaSyCUdDvqomv-YwURzNRMkObIaV9uxwoel4I",
    authDomain: "trinkerr-project-65b94.firebaseapp.com",
    projectId: "trinkerr-project-65b94",
    storageBucket: "trinkerr-project-65b94.appspot.com",
    messagingSenderId: "355167737303",
    appId: "1:355167737303:web:4102977f3ac3db5a9d6792",
    measurementId: "G-ZFH1KLFKL9",
  };

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
          this.onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  }, []);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  const auth = firebase.auth();

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    }
    console.log(user);
  });

  const loginSubmit = (e) => {
    e.preventDefault();
    let nameData = e.target.name.value;
    // console.log(nameData);
    setNames(nameData);
    let phone_number = "+91" + e.target.phone.value;
    const appVerifier = window.recaptchaVerifier;

    auth
      .signInWithPhoneNumber(phone_number, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        console.log("otp sent");
        setViewOtpForm(true);
        setLoading(true);
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        alert(error.message);
      });
  };

  const otpSubmit = (e) => {
    e.preventDefault();

    let opt_number = e.target.otp_value.value;

    window.confirmationResult
      .confirm(opt_number)
      .then((confirmationResult) => {
        setLoading(false);
        console.log(confirmationResult);
        console.log("success");
        localStore();
        history.push("/home", "_self");
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        alert(error.message);
      });
  };
  const localStore = () => {
    setLogin((login = true)); ///forced assingment
    const payload = {
      status: login,
      name: names,
    };
    localStorage.setItem("auth", JSON.stringify(payload));
  };

  // console.log(login)
  return (
    <div className="wrapper">
      <h1 className="main-heading">Sign in</h1>
      <p className="sub-text">Sign in using your mobile number.</p>
      {!viewOtpForm ? (
        <div className="form-wrapper">
          <form id="loginForm" onSubmit={loginSubmit}>
            <div className="input-field">
              <label>User Name</label>
              <input
                type="text"
                placeholder="name"
                name="name"
                autoComplete="false"
              />
            </div>
            <div className="input-field">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                autoComplete="false"
              />
            </div>
            <button className="main-button" type="submit" id="sign-in-button">
              Sign in
            </button>
          </form>
          {loading && <h2>Please Wait</h2>}
        </div>
      ) : (
        <div className="form-wrapper" onSubmit={otpSubmit}>
          <form id="otpForm">
            <div className="input-field">
              <label>Enter OTP</label>
              <input
                type="number"
                placeholder="One time password"
                name="otp_value"
                autoComplete="false"
              />
            </div>
            <button className="main-button" type="submit">
              Verify OTP
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignIn;
