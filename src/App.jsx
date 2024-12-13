import React, { useState } from "react";
import { initializeApp } from "../node_modules/firebase/app";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithPopup,
	GoogleAuthProvider,
} from "../node_modules/firebase/auth";

const firebaseConfig = {
	apiKey:
		"AIzaSyA-N5cAA-eqZJxSiks9HWR1SPdBw2BVCAM",
	authDomain: "kedai-manang.firebaseapp.com",
	projectId: "kedai-manang",
	storageBucket:
		"kedai-manang.firebasestorage.app",
	messagingSenderId: "909243316949",
	appId:
		"1:909243316949:web:30ecbbf022d48e792fc05c",
	measurementId: "G-4B7YLJXCJC",
};

initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const App = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isRegistering, setIsRegistering] =
		useState(false);

	const handleLogin = async () => {
		try {
			await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			alert("Login successful!");
		} catch (error) {
			alert(error.message);
		}
	};

	const handleRegister = async () => {
		try {
			await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			alert("Account created successfully!");
		} catch (error) {
			alert(error.message);
		}
	};

	const handleResetPassword = async () => {
		try {
			await sendPasswordResetEmail(auth, email);
			alert("Password reset email sent!");
		} catch (error) {
			alert(error.message);
		}
	};

	const handleGoogleLogin = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
			alert("Google login successful!");
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<div style={{ padding: "20px" }}>
			<h1>
				{isRegistering ? "Register" : "Login"}
			</h1>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				style={{
					display: "block",
					marginBottom: "10px",
				}}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) =>
					setPassword(e.target.value)
				}
				style={{
					display: "block",
					marginBottom: "10px",
				}}
			/>
			{isRegistering ? (
				<button onClick={handleRegister}>
					Register
				</button>
			) : (
				<button onClick={handleLogin}>
					Login
				</button>
			)}
			<button
				onClick={handleResetPassword}
				style={{ marginLeft: "10px" }}>
				Reset Password
			</button>
			<button
				onClick={handleGoogleLogin}
				style={{ marginTop: "10px" }}>
				Login with Google
			</button>
			<p>
				{isRegistering
					? "Already have an account?"
					: "Don't have an account?"}
				<span
					onClick={() =>
						setIsRegistering(!isRegistering)
					}
					style={{
						color: "blue",
						cursor: "pointer",
					}}>
					{isRegistering
						? "Login here"
						: "Register here"}
				</span>
			</p>
		</div>
	);
};

export default App;
