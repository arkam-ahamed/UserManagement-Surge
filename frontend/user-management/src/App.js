import React from "react";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import StudentPage from "./pages/StudentPage";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route exact path="/admin" element={<AdminPage />} />
				<Route exact path="/" element={<Login />} />
				<Route exact path="/student" element={<StudentPage />} />
			</Routes>
		</div>
	);
}

export default App;
