import React from "react";
import "./App.css";
import { Container, Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthComponent from "./components/AuthComponent";
function App() {
  return (
    <Container>
      <Row>
        <Routes>
          <Route path="/" element={<Register />} />
          {<Route path="/login" element={<Login />} />}
          {<Route path="/auth" element={<AuthComponent />} />}
        </Routes>
      </Row>
    </Container>
  );
}

export default App;
