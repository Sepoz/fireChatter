// TRY CONDITIONAL CHAINING

import React from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function MainNavbar({ user, signInUser, signOutUser }) {
	return (
		<div>
			<Navbar bg="light">
				<Container>
					<Row className="w-100 align-items-center">
						<Col>
							<h1 className="m-0">FireChat</h1>
						</Col>

						<Col className="text-center">
							{user ? (
								<p className="m-0">
									Il tuo codice è: {user?.userUID}
								</p>
							) : (
								<p className="m-0">Nessun user</p>
							)}
						</Col>

						<Col>
							{user ? (
								<Button variant="primary" onClick={signOutUser}>
									Sign Out
								</Button>
							) : (
								<Button variant="primary" onClick={signInUser}>
									Sign In
								</Button>
							)}
						</Col>
					</Row>
				</Container>
			</Navbar>
		</div>
	);
}

export default MainNavbar;
