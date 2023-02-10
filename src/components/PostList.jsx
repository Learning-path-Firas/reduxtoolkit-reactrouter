import React, { useState } from "react";
import { useEffect } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../state/postSlice";
import { Loading } from "./Loading";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
export const PostList = () => {
	const dispatch = useDispatch();
	const { records, loading, error } = useSelector((state) => state.posts);
	console.log(records);
	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th style={{ width: "70%" }}>Title</th>
						<th style={{ width: "10%" }}></th>
					</tr>
				</thead>
				<tbody>
					{records &&
						records.map((element, index) => {
							return (
								<PostsListItem
									data={element}
									key={index}
									loading={loading}
									error={loading}
								/>
							);
						})}
				</tbody>
			</Table>
		</>
	);
};

export const PostsListItem = ({ data, loading, error }) => {
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleDelete = () => {
		dispatch(deletePost(data.id));
	};
	return (
		<>
			<tr key={data.id}>
				<td>{data.id}</td>
				<td>{data.title}</td>
				<td>
					<ButtonGroup aria-label="Basic example">
						<Button variant="success">
							<Link to={`post/${data.id}/edit`}>Edit</Link>
						</Button>
						<Button variant="danger" onClick={handleShow}>
							Delete
						</Button>
					</ButtonGroup>
				</td>
			</tr>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Loading loading={loading} error={error}>
						<Button variant="primary" onClick={handleDelete}>
							Save Changes
						</Button>
					</Loading>
				</Modal.Footer>
			</Modal>
		</>
	);
};
