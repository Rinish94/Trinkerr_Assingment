import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router";

const imagesPool = [
  "http://getdrawings.com/free-icon-bw/one-icon-4.png",
  "http://getdrawings.com/free-icon-bw/free-shirt-icon-9.png",
  "http://getdrawings.com/free-icon-bw/serial-number-icon-19.png",
  "http://getdrawings.com/free-icon-bw/serial-number-icon-18.png",
  "http://getdrawings.com/free-icon-bw/number-one-icon-17.png",
];

const Home = () => {
  const [count, setCount] = useState(0);
  const history = useHistory();
  const firebaseConfig = {
    apiKey: "AIzaSyCUdDvqomv-YwURzNRMkObIaV9uxwoel4I",
    authDomain: "trinkerr-project-65b94.firebaseapp.com",
    projectId: "trinkerr-project-65b94",
    storageBucket: "trinkerr-project-65b94.appspot.com",
    messagingSenderId: "355167737303",
    appId: "1:355167737303:web:4102977f3ac3db5a9d6792",
    measurementId: "G-ZFH1KLFKL9",
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  const localData = JSON.parse(localStorage.getItem("auth")) || undefined;

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.open("/", "_self");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
    localStorage.setItem("auth", JSON.stringify({ status: false }));
  };

  const imageForward = () => {
    if (count > count.length - 1) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };
  // console.log(count);
  //  imageForward
  const imageBackward = () => {
    if (count <= 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
  };
  (!localData?.status || localData === undefined) && history.push("/"); //

  return (
    <div className="wrapper">
      <h1 className="main-heading">Welcome 👋, {localData?.name}</h1>
      <button className="main-button" id="signOut" onClick={signOut}>
        Sign Out
      </button>
      <div>
        <img width="50px" height="50px" src={imagesPool[count]} alt="images" />
        <div>
          <button onClick={imageBackward} disabled={count === 0}>
            {"<"}
          </button>
          <button
            onClick={imageForward}
            disabled={count === imagesPool.length - 1}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
