import axios from "axios";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import login from "../styles/login.css";

const Login = () => {
	const { register, handleSubmit, reset } = useForm();

	const navigate = useNavigate();
	const submit = (data) => {
		axios.post(
			"https://e-commerce-api.academlo.tech/api/v1/users/login",
			data
		)
			.then((res) => {
				localStorage.setItem(
					"name",
					res.data.data.user.firstName
				);
				navigate("/");
				localStorage.setItem(
					"token",
					res.data.data.token
				);
			})
			.catch((error) => {
				if (error.response.status === 404) {
					alert("Invalid User");
				} else {
					console.log(error.response);
				}
			});
		reset({
			email: "",
			password: "",
		});
	};

	return (
		<div className="login-card">
			<h1>Log In</h1>
			<p>
				Welcome back! You are not logged in but don't
				worry, you can use our test data below and start
				shoping!
			</p>
			<div className="test-data">
				<p>Test Email:</p>
				<p>
					{" "}
					email: jordimantilla21@gmail.com <br />
					password: pass1234
				</p>
			</div>
			<Form onSubmit={handleSubmit(submit)}>
				<Form.Group
					className="mb-2"
					controlId="formBasicEmail"
				>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						{...register("email")}
					/>
					<Form.Text className="text-muted">
						We'll never share your email
						with anyone else.
					</Form.Text>
				</Form.Group>
				<Form.Group
					className="mb-2"
					controlId="formBasicPassword"
				>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						{...register("password")}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default Login;
