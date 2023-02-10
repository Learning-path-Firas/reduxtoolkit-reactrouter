import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { Button } from "react-bootstrap";

const ErrorPage = () => {
	const navigate = useNavigate();
	const error = useRouteError();
	console.error(error);
	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.data}</i>
			</p>
			<Button variant="link" onClick={() => navigate("/", { replace: true })}>
				Link
			</Button>
		</div>
	);
};

export default ErrorPage;
