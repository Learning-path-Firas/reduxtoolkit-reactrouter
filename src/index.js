import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./pages/RootLayout";
import Add from "./pages/add";
import Edit from "./pages/edit";
import Details from "./pages/details";
import { PostList } from "./components/PostList";
import ErrorPage from "./pages/errorPage";
import { Provider } from "react-redux";
import store from "./state";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <PostList />,
			},
			{
				path: "post/add",
				element: <Add />,
			},
			{
				path: "post/:id/edit",
				element: <Edit />,
				loader: ({ params }) => {
					if (isNaN(params.id)) {
						throw new Response("bad request", {
							status: 400,
							statusText: "plz insert correct post id",
						});
					}
				},
			},
			{
				path: "post/:id",
				element: <Details />,
				loader: ({ params }) => {
					if (isNaN(params.id)) {
						throw new Response("bad request", {
							status: 400,
							statusText: "plz insert correct post id",
						});
					}
				},
			},
		],
	},
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		{" "}
		<RouterProvider router={router} />
	</Provider>,
);
