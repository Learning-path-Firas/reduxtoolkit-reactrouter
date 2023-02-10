import React, { useEffect, useState } from "react";
import Add from "./add";
import { useDispatch } from "react-redux";
import { GetByIdPost } from "../state/postSlice";
import { useParams } from "react-router-dom";

function Edit() {
	return (
		<div>
			{" "}
			<Add />{" "}
		</div>
	);
}

export default Edit;
