import React from "react";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../../Firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";

function Signup() {
  const nav = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    userId: crypto.randomUUID(),
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

  };

  const storeUserInFirestore = async (user) => {
    try {
      const usersCollection = collection(firestore, "users");
      const userDoc = doc(usersCollection, user.uid);

      // Create a user document in Firestore with the user's UID
      await setDoc(userDoc, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        createdAt: new Date(),
      });

      console.log("User stored in Firestore successfully:", user.uid);
    } catch (error) {
      console.error("Error storing user in Firestore:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const newUser = res.user;

      // Update the user profile with the provided name
      await updateProfile(newUser, { displayName: user.name, followers: 0 });

      // Store user information in Firestore
      await storeUserInFirestore(newUser);
      setLoading(false);
      nav("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLoginRoute = () => {
    nav("/login");
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const displayName = user.displayName;
        const email = user.email;
        const uid = user.uid;
        await addDoc(collection(firestore, "users"), {
          displayName,
          email,
          uid,
        });
        nav("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SignupBtn = {
    width: "95%",
    height: "45px",
    borderRadius: "10px",
    border: "none",
    cursor:"pointer",
    color: "#777777",
    background: "#1e1e1e",
    fontsFamily: "sans-seriff",
    fontWeight: "bold",
  };

  return (
    <Box sx={SignupContainer}>
      <Box>
        <img
          src="https://www.logomaker.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6kh...CCrhNMmBfFwXs1M3EMoAJtlyAthvFv...foz"
          alt="logo"
          width={150}
          height={100}
        />
      </Box>
      <Box sx={SignupFormContainer}>
        <form onSubmit={handleSubmit}>
          <Box sx={inputsContainer}>
            <input
              type="name"
              name="name"
              placeholder="Enter Name & Surname"
              onChange={handleChange}
              style={inputs}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email Adress"
              onChange={handleChange}
              style={inputs}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              style={inputs}
            />
            <button type="submit" style={SignupBtn}>
              {loading ? (
                <CircularProgress size={20} style={{ color: "grey" }} />
              ) : (
                "Sign up"
              )}
            </button>

            <p style={loginRoute} onClick={handleLoginRoute}>
              Already a member?
            </p>
          </Box>
        </form>

        <Box sx={orLineText}>
          {" "}
          <hr style={{ width: "120px", border: "1px solid #777777" }} />
          or <hr style={{ width: "120px", border: "1px solid #777777" }} />
        </Box>

        <Box sx={googleSignup} onClick={signInWithGoogle}>
          <img
            src="data:image/png;base64,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"
            alt="google-logo"
            width={25}
            height={25}
            style={{ marginLeft: "20px" }}
          />
          <p style={{ marginRight: "70px", fontSize: "14px" }}>
            Sign up with Google
          </p>
        </Box>
      </Box>
      <Box sx={footerContainer}>
        <p style={footerText}>© 2023</p>
        <p style={footerText}>CloudMix Terms</p>
        <p style={footerText}>Privacy Policy</p>
        <p style={footerText}>Cookies Policy</p>
        <p style={footerText}>Report a problem</p>
      </Box>
    </Box>
  );
}

export default Signup;

const SignupContainer = {
  width: "100%",
  height: "100vh",
  background: "#101010",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

const SignupFormContainer = {
  width: "300px",
  height: "400px",
};

const inputsContainer = {
  width: "100%",
  height: "300px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  flexDirection: "column",
};

const inputs = {
  width: "90%",
  height: "45px",
  paddingLeft: "10px",
  background: "#1e1e1e",
  border: "none",
  borderRadius: "10px",
  color: "#777777",
};

const loginRoute = {
  fontSize: "12px",
  color: "#777777",
  cursor: "pointer",
};

const orLineText = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  color: "#777777",
};

const googleSignup = {
  width: "95%",
  height: "45px",
  background: "#FFFFFF",
  marginTop: "20px",
  color: "black",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  marginLeft: "7px",
};

const footerContainer = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  fontSize: "14px",
  color: "#777777",
};

const footerText = {
  marginLeft: "10px",
  cursor: "pointer",
};
