import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineEditNote, MdDelete } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import swal from "sweetalert";
function StudentPage() {
	const [noteList, setNoteList] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const baseURL = "http://localhost:8080/api/note";

	useEffect(() => {
		const getNotes = () => {
			axios.get(baseURL).then((response) => {
				setNoteList(response.data);
			});
		};
		getNotes();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (title === "" || description === "" || "") {
			swal("Error!", "please fill the fields!", "error");
		} else {
			addNotes(title, description);
		}
	};

	const addNotes = (title, description) => {
		axios
			.post(baseURL, {
				title: title,
				description: description,
			})
			.then((response) => {
				setNoteList([response.data, ...noteList]);
			});
		setTitle("");
		setDescription("");
	};

	const deleteNote = (id) => {
		axios.delete(`${baseURL}${id}`, {
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
		setNoteList(
			noteList.filter((note) => {
				return note.id !== id;
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
									<MdOutlineEditNote />
									<span className="ms-3">Create Notes</span>
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
									<span className="ms-3">View Notes</span>
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
											Enter the title:
										</label>
										<input
											type="text"
											className="form-control"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
										/>
									</div>
									<div className="mb-3">
										<label
											htmlFor="exampleFormControlTextarea1"
											className="form-label"
										>
											Enter the description:
										</label>
										<input
											type="text"
											className="form-control"
											value={description}
											onChange={(e) => setDescription(e.target.value)}
										/>
									</div>
									<button type="submit">Create Note</button>
								</div>
								<div
									className="tab-pane fade"
									id="v-tabs-profile"
									role="tabpanel"
									aria-labelledby="v-tabs-profile-tab"
								>
									<div className="row">
										{noteList.map((note) => {
											return (
												<div className="col-lg-4 mb-3">
													<div key={note.id} className="card px-3 py-4 h-100">
														<img
															src="https://i.pinimg.com/736x/5a/2e/3e/5a2e3e2120ff70e64741dd7814735ada--sticky-notes-art-online.jpg"
															alt=""
															className="d-block mx-auto w-50 mb-4"
														></img>
														<h5 className="fw-bolder text-capitalize">
															{note.title}
														</h5>
														<p className="text-secondary my-0">
															{note.description}
														</p>

														<div>
															<button
																className="border-0 float-end px-3 py-1"
																onClick={() => deleteNote(note.id)}
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
export default StudentPage;
