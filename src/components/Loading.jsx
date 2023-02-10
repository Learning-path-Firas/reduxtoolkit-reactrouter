import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export const Loading = ({ loading, error, state, children }) => {
	if (React.isValidElement(children) && children.type === Button) {
		console.log("Loading inside hoc", state);
		return (
			<>
				{loading ? (
					React.cloneElement(children, { disabled: true }, "Isloading...")
				) : error ? (
					<Button variant="danger">Error</Button>
				) : state === "add" ? (
					React.cloneElement(children, { children: "add Post" })
				) : (
					React.cloneElement(children, { children: "edit Post" })
				)}
			</>
		);
	}
	return <>{Loading ? <p>loading ...</p> : error ? <p>error</p> : children}</>;
};
