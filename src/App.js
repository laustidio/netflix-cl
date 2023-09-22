import "./App.css";
import { auth } from "./firebase";
import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from "./components/pages/HomeScreen";
import LoginScreen from "./components/pages/LoginScreen";
import { useDispatch, useSelector } from "react-redux";
import ProfileScreen from "./components/pages/ProfileScreen";
import { login, logout, selectUser } from "./features/userSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
