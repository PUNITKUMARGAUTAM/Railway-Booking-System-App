import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { login as apiLogin } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "./LoginModal.css";

export default function LoginModal({ show, onClose }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { login } = useContext(AuthContext);

  const submit = async (e) => {
    e?.preventDefault();
    setLoading(true); setErr("");
    try {
      const data = await apiLogin(form); // expects { user, token }
      login(data.user, data.token);
      onClose();
    } catch (error) {
      setErr(error.message || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Form onSubmit={submit}>
        <Modal.Header closeButton><Modal.Title>Login</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2"><Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/>
          </Form.Group>
          <Form.Group className="mb-2"><Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/>
          </Form.Group>
          {err && <div className="text-danger">{err}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button type="submit" variant="primary" disabled={loading}>{loading ? "Please wait..." : "Login"}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
