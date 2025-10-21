import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();  // {user, token}
      login(data.user, data.token);
      toast.success(`Welcome ${data.user.role}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <h3>Login</h3>
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br/>
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} /><br/>
      <button type="submit">Login</button>
    </form>
  );
}



// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const { login } = useContext(AuthContext);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       if (!res.ok) throw new Error("Login failed");
//       const data = await res.json();  // {user, token}
//       login(data.user, data.token);
//       toast.success("Login successful");
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-3">
//       <h3>Login</h3>
//       <input name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br/>
//       <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} /><br/>
//       <button type="submit">Login</button>
//     </form>
//   );
// }



// import React, { useState, useContext } from "react";
// import { toast } from 'react-toastify';
// import { Modal, Button, Form } from "react-bootstrap";
// import { login as apiLogin } from "../services/api";
// import { AuthContext } from "../context/AuthContext";
// import "./LoginModal.css";

// export default function LoginModal({ show, onClose }) {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");
//   const { login } = useContext(AuthContext);

//   const submit = async (e) => {
//     e?.preventDefault();
//     setLoading(true);
//     setErr("");

//     try {
//       const data = await apiLogin(form);
//       const userObj = data.user || data; // handle if backend returns flat object
//       const token = data.token;

//       login(userObj, token);
//       toast.success('Login successful ✅');
//       onClose();
//     } catch (error) {
//       const msg =
//         error?.response?.data?.message ||
//         error?.message ||
//         error?.msg ||
//         "Login failed";
//       setErr(msg);
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal show={show} onHide={onClose} centered>
//       <Form onSubmit={submit}>
//         <Modal.Header closeButton>
//           <Modal.Title>Login</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group className="mb-2">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               value={form.email}
//               onChange={e => setForm({ ...form, email: e.target.value })}
//               required
//               disabled={loading}
//             />
//           </Form.Group>
//           <Form.Group className="mb-2">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               value={form.password}
//               onChange={e => setForm({ ...form, password: e.target.value })}
//               required
//               disabled={loading}
//             />
//           </Form.Group>
//           {err && <div className="text-danger">{err}</div>}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={onClose} disabled={loading}>
//             Close
//           </Button>
//           <Button type="submit" variant="primary" disabled={loading}>
//             {loading ? "Please wait..." : "Login"}
//           </Button>
//         </Modal.Footer>
//       </Form>
//     </Modal>
//   );
// }



// import React, { useState, useContext } from "react";
// import { toast } from 'react-toastify';
// import { Modal, Button, Form } from "react-bootstrap";
// import { login as apiLogin } from "../services/api";
// import { AuthContext } from "../context/AuthContext";
// import "./LoginModal.css";

// export default function LoginModal({ show, onClose }) {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");
//   const { login } = useContext(AuthContext);

//   const submit = async (e) => {
//     e?.preventDefault();
//     setLoading(true); setErr("");
//     try {
//   const data = await apiLogin(form);
//   // backend login returns user + token (per earlier code)
//   // if your login returns { ...others, token } (flat), convert:
//   const userObj = data.user || data; // safe fallback
//   const token = data.token;
//   login(userObj, token);
//   toast.success('Login successful');
//   onClose();
// } catch (error) {
//   const msg = error?.message || error?.msg || JSON.stringify(error) || "Login failed";
//   setErr(msg);
//   toast.error(msg);
// } finally {
//   setLoading(false);
// }
//   };
//     // try {
//     //   const data = await apiLogin(form); // expects { user, token }
//     //   login(data.user, data.token);
//     //   onClose();
//     // } catch (error) {
//     //   setErr(error.message || "Login failed");
//     // } finally { setLoading(false); }
//   //};

//   return (
//     <Modal show={show} onHide={onClose} centered>
//       <Form onSubmit={submit}>
//         <Modal.Header closeButton><Modal.Title>Login</Modal.Title></Modal.Header>
//         <Modal.Body>
//           <Form.Group className="mb-2"><Form.Label>Email</Form.Label>
//             <Form.Control type="email" name="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/>
//           </Form.Group>
//           <Form.Group className="mb-2"><Form.Label>Password</Form.Label>
//             <Form.Control type="password" name="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/>
//           </Form.Group>
//           {err && <div className="text-danger">{err}</div>}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={onClose}>Close</Button>
//           <Button type="submit" variant="primary" disabled={loading}>{loading ? "Please wait..." : "Login"}</Button>
//         </Modal.Footer>
//       </Form>
//     </Modal>
//   );
//}
