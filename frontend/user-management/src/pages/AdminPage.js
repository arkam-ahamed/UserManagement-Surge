import { useEffect, useState } from "react";
import axios from "axios";
import validator from "validator";
import { MdDelete } from "react-icons/md";
import { AiOutlineUserAdd, AiOutlineEye } from "react-icons/ai";
import swal from "sweetalert";

function AdminPage() {
	const [userList, setUserList] = useState([]);
	const [firstName, setfirstName] = useState("");
	const [lastName, setlastName] = useState("");
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const [dateOfBirth, setdateOfBirth] = useState("");
	const [mobileNo, setmobileNo] = useState("");
	const [accountType, setaccountType] = useState("");
	const API_URL = "http://localhost:8080/api/user";
	useEffect(() => {
		const getUsers = () => {
			axios.get(API_URL).then((response) => {
				setUserList(response.data);
			});
		};

		getUsers();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			firstName === "" ||
			lastName === "" ||
			firstName === "" ||
			email === "" ||
			password === "" ||
			dateOfBirth === "" ||
			mobileNo === "" ||
			accountType === ""
		) {
			swal("Error!", "please fill the fields!", "error");
		} else if (!validator.isEmail(email)) {
			swal("Error!", "Please enter a valid email!", "error");
		} else if (mobileNo.length < 10 || mobileNo.length > 10) {
			swal("Error!", "Please enter a valid mobileNo!", "error");
		} else if (password.length < 8) {
			swal("Error!", "Password cannot be less than 8 characters!", "error");
		} else {
			addUsers(
				firstName,
				lastName,
				email,
				password,
				dateOfBirth,
				mobileNo,
				accountType
			);
		}
	};

	const addUsers = (
		firstName,
		lastName,
		email,
		password,
		dateOfBirth,
		mobileNo,
		accountType
	) => {
		axios
			.post(API_URL, {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
				dateOfBirth: dateOfBirth,
				mobileNo: mobileNo,
				accountType: accountType,
			})
			.then((response) => {
				setUserList([response.data, ...userList]);
			});
		setfirstName("");
		setlastName("");
		setemail("");
		setpassword("");
		setdateOfBirth("");
		setmobileNo("");
		setaccountType("");
	};

	const deleteUser = (id) => {
		axios.delete(`${API_URL}${id}`, {
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
		setUserList(
			userList.filter((user) => {
				return user.id !== id;
			})
		);
	};

	return (
		<div className="App">
			<div className="container">
				<form onSubmit={handleSubmit}>
					<div className="row mt-5">
						<div className="col-3">
							<div
								className="nav flex-column nav-tabs text-center"
								id="v-tabs-tab"
								role="tablist"
								aria-orientation="vertical"
							>
								<a
									className="nav-link"
									id="v-tabs-home-tab"
									data-mdb-toggle="tab"
									href="#v-tabs-home"
									role="tab"
									aria-controls="v-tabs-home"
									aria-selected="true"
								>
									<AiOutlineUserAdd />
									<span className="ms-3">Create User</span>
								</a>
								<a
									className="nav-link"
									id="v-tabs-profile-tab"
									data-mdb-toggle="tab"
									href="#v-tabs-profile"
									role="tab"
									aria-controls="v-tabs-profile"
									aria-selected="false"
								>
									<AiOutlineEye />
									<span className="ms-3">View Users</span>
								</a>
							</div>
						</div>

						<div className="col-9">
							<div className="tab-content" id="v-tabs-tabContent">
								<div
									className="tab-pane fade show active"
									id="v-tabs-home"
									role="tabpanel"
									aria-labelledby="v-tabs-home-tab"
								>
									<div className="mb-3">
										<label
											htmlFor="exampleFormControlInput1"
											className="form-label"
										>
											Enter the firstname:
										</label>
										<input
											type="text"
											className="form-control"
											value={firstName}
											onChange={(e) => setfirstName(e.target.value)}
										/>
									</div>
									<div className="mb-3">
										<label
											htmlFor="exampleFormControlTextarea1"
											className="form-label"
										>
											Enter the lastname:
										</label>
										<input
											type="text"
											className="form-control"
											value={lastName}
											onChange={(e) => setlastName(e.target.value)}
										/>
									</div>
									<div className="mb-3">
										<label
											htmlFor="exampleFormControlTextarea1"
											className="form-label"
										>
											Enter the Email:
										</label>
										<input
											type="email"
											className="form-control"
											value={email}
											onChange={(e) => setemail(e.target.value)}
										/>
									</div>
									<div className="mb-3">
										<label
											htmlFor="exampleFormControlTextarea1"
											className="form-label"
										>
											Enter the password:
										</label>
										<input
											type="password"
											className="form-control"
											value={password}
											onChange={(e) => setpassword(e.target.value)}
										/>
									</div>
									<div className="mb-3">
										<label
											htmlFor="exampleFormControlTextarea1"
											className="form-label"
										>
											Enter Date of Birth:
										</label>
										<input
											type="date"
											className="form-control"
											value={dateOfBirth}
											onChange={(e) => setdateOfBirth(e.target.value)}
										/>
									</div>
									<div className="mb-3">
										<label
											htmlFor="exampleFormControlTextarea1"
											className="form-label"
										>
											Enter MobileNo:
										</label>
										<input
											type="text"
											className="form-control"
											value={mobileNo}
											onChange={(e) => setmobileNo(e.target.value)}
										/>
									</div>
									<div className="mb-3">
										<label className="form-label">Select Account Type:</label>
										<div className="form-check">
											<input
												className="form-check-input"
												type="radio"
												name="user"
												id="flexRadioDefault1"
												value={accountType}
												onChange={(e) => setaccountType("ADMIN")}
											/>
											<label
												className="form-check-label"
												for="flexRadioDefault1"
											>
												ADMIN
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="radio"
												name="user"
												id="flexRadioDefault1"
												value={accountType}
												onChange={(e) => setaccountType("STUDENT")}
											/>
											<label
												className="form-check-label"
												for="flexRadioDefault1"
											>
												STUDENT
											</label>
										</div>
									</div>
									<button onClick={handleSubmit} type="submit">
										Create User
									</button>
								</div>
								<div
									className="tab-pane fade"
									id="v-tabs-profile"
									role="tabpanel"
									aria-labelledby="v-tabs-profile-tab"
								>
									<div className="row">
										{userList.map((user) => {
											return (
												<div className="col-lg-4 mb-3">
													<div key={user.id} className="card px-3 py-4 h-100">
														<img
															src="https://dbtindiaalliance.s3.ap-south-1.amazonaws.com/zyoqsezuyavbbpj1636097003662_Original.jpeg"
															alt=""
															className="d-block mx-auto w-50 mb-4"
														></img>
														<h5 className="fw-bolder text-capitalize">
															{user.firstName} {user.lastName}
														</h5>
														<p className="text-secondary my-0">
															{user.accountType}
														</p>
														<p className="text-black-50 my-0">{user.email}</p>
														<p className="text-black-50 my-0">
															{user.dateOfBirth}
														</p>
														<p className="text-black-50 my-0">
															{user.mobileNo}
														</p>
														<div>
															<button
																className="border-0  float-end px-3 py-1 "
																onClick={() => deleteUser(user.id)}
															>
																<MdDelete />
															</button>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AdminPage;
