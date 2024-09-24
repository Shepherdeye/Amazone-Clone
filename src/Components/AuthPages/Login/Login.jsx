import React, { useState } from "react";
import Logo from "../../../images/login-logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../Context/GlobalState";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase"
import Swal from "sweetalert2";

const Login = () => {
    const { user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then((respone) => {
            if (respone) {
                navigate("/")
            }
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
            });
        })


    }
    const register = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password).then((respone) => {
            if (respone) {
                navigate("/")
            }
        }).catch((error) => {

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
            });

        })

    }


    return (
        <div className="login">
            <Link to="/">
                <img className="login-logo" src={Logo} alt="logo-img" />
            </Link>
            <div className="login-container">
                <h1>Sign in</h1>
                <form>
                    <h5>Email</h5>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <h5>Password</h5>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    <button className="login-signInBtn" type="submit" onClick={signIn} >
                        Sign in
                    </button>
                    <p>
                        By continuing, you agree to Amazon's Fake Clone Conditions of Use
                        and Privacy Notice.
                    </p>
                    <button className="login-registerBtn" onClick={register}>
                        Create your Amazon Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;