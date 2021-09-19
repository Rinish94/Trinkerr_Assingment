import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router";
import one from "../../ImageFolder/oneIcon.png";
import two from "../../ImageFolder/twoIcon.png";
import three from "../../ImageFolder/threeIcon.png";
import four from "../../ImageFolder/fourIcon.png";
import five from "../../ImageFolder/fiveIcon.png";
import "./Home.css";
const imagesPool = [
  {
    name: "First",
    src: one,
  },
  {
    name: "Second",
    src: two,
  },
  {
    name: "Third",
    src: three,
  },
  {
    name: "Fourth",
    src: four,
  },
  {
    name: "Fifth",
    src: five,
  },
];

const Home = () => {
  const localData = JSON.parse(localStorage.getItem("auth")) || undefined;
  const [count, setCount] = useState(localData?.imgNum || 0);
  const [dataDisplay, setDataDisplay] = useState(false);
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
        localStorage.clear();
        window.open("/", "_self");
      })
      .catch((error) => {
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
      }, 4000);
    }
    if (count >= imagesPool.length - 1) {
      // setCount(4);
      clearInterval(timer);
      dataDisp();
    }

    console.log("object");
    return () => {
      clearInterval(timer);
    };
  }, [count]);

  console.log(count);
  const resetData = () => {
    setDataDisplay(false);
    localStorage.setItem(
      "auth",
      JSON.stringify({ status: true, imgNum: count, name: localData?.name })
    );
    setCount(0);
  };
  const dataDisp = () => {
    setTimeout(() => {
      setDataDisplay(true);
    }, 5000);
  };
  return (
    <div className="wrapper2">
      <button className="SignOut-button" id="signOut" onClick={signOut}>
        Sign Out
      </button>
      <h1 className="main-heading">Welcome {localData?.name} 👋</h1>
      <div className="dataContainer">
        <div className="dataCont2">
          <div className="imgDiv">
            <img
              width="250px"
              height="250px"
              src={imagesPool[count].src}
              alt="images"
            />
          </div>
          <div className="imgButton">
            <button onClick={imageBackward}>{"<"}</button>
            <button onClick={resetData}>Reset</button>
            <button onClick={imageForward}>{">"}</button>
          </div>
        </div>
        {dataDisplay && (
          <p>
            {" "}
            {`${localData?.name} you have rated all the images. Thank You!`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
