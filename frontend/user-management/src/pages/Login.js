import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import "../App.css";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const API_URL = "http://localhost:8080/";

	const onHandleLoginSubmit = async () => {
		if (email === "" || password === "" || "") {
			swal("Error!", "please fill the fields!", "error");
		} else {
			async function login(email, password) {
				try {
					const qs = require("qs");
					const response = await axios.post(
						API_URL + "login",
						qs.stringify({ email: email, password: password })
					);
					const token = response.data.access_token;
					const decoded = jwt_decode(token);
					if (response.data.accessToken) {
						localStorage.setItem("1", "true");
						localStorage.setItem("2", decoded);
					}

					if (decoded.accountType[0] === "ADMIN") {
						navigate("/admin");
					} else {
						navigate("/student");
					}
				} catch (err) {
					swal(
						"Incorrect!",
						"please enter correct email and password!",
						"error"
					);
				}
			}
			login(email, password);
		}
	};
	return (
		<React.Fragment>
			<div className="container vh-100">
				<div className="d-flex h-100 align-items-center">
					<div className="card ">
						<div className="row">
							<div className="col-lg-6">
								<img
									src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
									alt=""
									className="img-fluid"
								/>
							</div>
							<div className="col-lg-6 px-5 py-5">
								<div className="mb-3">
									<label
										htmlFor="exampleFormControlInput1"
										className="form-label"
									>
										Email address
									</label>
									<input
										type="email"
										className="form-control"
										placeholder="Enter email"
										onChange={(e) => {
											setEmail(e.target.value);
										}}
									/>
								</div>
								<div className="mb-3">
									<label
										htmlFor="exampleFormControlTextarea1"
										className="form-label"
									>
										Password
									</label>
									<input
										type="password"
										className="form-control"
										placeholder="Enter password"
										onChange={(e) => {
											setPassword(e.target.value);
										}}
									/>
								</div>
								<button onClick={onHandleLoginSubmit} type="submit">
									Login
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
export default Login;
