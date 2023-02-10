import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { GetByIdPost, InsertPost, updatePost } from "../state/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../components/Loading";

function Add() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error } = useSelector((state) => state.posts);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [state, setState] = useState("add");
	const { id } = useParams();
	useEffect(() => {
		dispatch(GetByIdPost(id))
			.unwrap()
			.then((res) => {
				console.log(res);
				setTitle(res.title);
				setDescription(res.description);
				setState("edit");
			});
	}, [id, dispatch]);
	const addPost = (event) => {
		event.preventDefault();
		const id = Math.floor(Math.random() * 500);
		dispatch(InsertPost({ id, title, description }))
			.unwrap()
			.then(() => {
				console.log("Insert succesed");
				navigate("/");
			})
			.catch((error) => {
				console.log("Error", error);
			});
	};
	const editPost = (event) => {
		event.preventDefault();
		dispatch(updatePost({ id, title, description }))
			.unwrap()
			.then(() => {
				console.log("update succesed");
				navigate("/");
			})
			.catch((error) => {
				console.log("Error", error);
			});
	};
	return (
		<div>
			<Form onSubmit={state === "add" ? addPost : editPost}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Description</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</Form.Group>
				<Loading loading={loading} error={error} state={state}>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Loading>
			</Form>
		</div>
	);
}

export default Add;
