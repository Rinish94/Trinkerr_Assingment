import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router";

const imagesPool = [
  {
    name: "First",
    src: "http://getdrawings.com/free-icon-bw/one-icon-4.png",
  },
  {
    name: "Second",
    src: "http://getdrawings.com/free-icon-bw/free-shirt-icon-9.png",
  },
  {
    name: "Third",
    src: "http://getdrawings.com/free-icon-bw/serial-number-icon-19.png",
  },
  {
    name: "Fourth",
    src: "http://getdrawings.com/free-icon-bw/serial-number-icon-18.png",
  },
  {
    name: "Fifth",
    src: "http://getdrawings.com/free-icon-bw/number-one-icon-17.png",
  },
];

const Home = () => {
  const localData = JSON.parse(localStorage.getItem("auth")) || undefined;
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

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.setItem("auth", JSON.stringify({ status: false }));
        history.push("/", "_self");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const imageForward = () => {
    alert(
      `${localData?.name}, you have selected image ${imagesPool[count].name}`
    );
  };
  // console.log(count);
  //  imageForward
  const imageBackward = () => {
    alert(
      `${localData?.name}, you have rejected image  ${imagesPool[count].name}`
    );
  };
  (!localData?.status || localData === undefined) && history.push("/"); //
  useEffect(() => {
    localStorage.setItem(
      "auth",
      JSON.stringify({ status: true, imgNum: count, name: localData?.name })
    );
    if (count < 0) {
      setCount(0);
    } else {
      var timer = setInterval(() => {
        setCount(count + 1);
      }, 2000);
    }
    if (count >= imagesPool.length - 1) {
      // setCount(4);
      clearInterval(timer);
    }

    console.log("object");
    return () => {
      clearInterval(timer);
    };
  }, [count]);

  console.log(count);
  const resetData = () => {
    localStorage.clear();
    setCount(0);
  };
  return (
    <div className="wrapper">
      <h1 className="main-heading">Welcome 👋, {localData?.name}</h1>
      <button className="main-button" id="signOut" onClick={signOut}>
        Sign Out
      </button>
      <div>
        <img
          width="50px"
          height="50px"
          src={imagesPool[count].src}
          alt="images"
        />
        <div>
          <button onClick={imageBackward}>{"<"}</button>
          <button onClick={imageForward}>{">"}</button>
          <button onClick={resetData}>Reset</button>
        </div>
        {count === 4 && (
          <p>
            {" "}
            {`${localData?.name}, you have rated all the images. Thank You!`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
