import React from "react";
import { Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./../components/Header";
export const RootLayout = () => {
	return (
		<div>
			{" "}
			<Header />
			<Row>
				<Col xs={{ span: 8, offset: 2 }}>
					<Outlet />
				</Col>
			</Row>
		</div>
	);
};
