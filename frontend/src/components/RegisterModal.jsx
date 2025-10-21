import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Register failed");
      toast.success("Registered successfully. Please login now.");
      setForm({ name: "", email: "", password: "", role: "user" });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <h3>Register</h3>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br/>
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br/>
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} /><br/>
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select><br/>
      <button type="submit">Register</button>
    </form>
  );
}


// import React, { useState } from "react";
// import { toast } from "react-toastify";

// export default function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "user",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       if (!res.ok) throw new Error("Register failed");
//       toast.success("Registered successfully. Please login now.");
//       setForm({ name: "", email: "", password: "", role: "user" });
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-3">
//       <h3>Register</h3>
//       <input name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br/>
//       <input name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br/>
//       <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} /><br/>
//       <select name="role" value={form.role} onChange={handleChange}>
//         <option value="user">User</option>
//         <option value="admin">Admin</option>
//       </select><br/>
//       <button type="submit">Register</button>
//     </form>
//   );
// }



// import React, { useState, useContext } from "react";
// import { toast } from 'react-toastify';
// import { Modal, Button, Form } from "react-bootstrap";
// import { register as apiRegister } from "../services/api";
// import { AuthContext } from "../context/AuthContext";
// import "./RegisterModal.css";

// export default function RegisterModal({ show, onClose }) {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");
//   const { login } = useContext(AuthContext);

//   const submit = async (e) => {
//     e?.preventDefault();
//     setLoading(true);
//     setErr("");

//     try {
//       const data = await apiRegister(form);
//       const userObj = data.user || data; // handle if backend returns flat object
//       const token = data.token;

//       login(userObj, token);
//       toast.success('Registered & logged in 🎉');
//       onClose();
//     } catch (error) {
//       const msg =
//         error?.response?.data?.message ||
//         error?.message ||
//         error?.msg ||
//         "Register failed";
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
//           <Modal.Title>Register</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group className="mb-2">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               value={form.name}
//               onChange={e => setForm({ ...form, name: e.target.value })}
//               required
//               disabled={loading}
//             />
//           </Form.Group>
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
//             {loading ? "Please wait..." : "Register"}
//           </Button>
//         </Modal.Footer>
//       </Form>
//     </Modal>
//   );
// }

    //   try {
    //     const data = await apiRegister(form); // expects { user, token }
    //     login(data.user, data.token);
    //     onClose();
    //   } catch (error) {
    //     setErr(error.message || "Register failed");
    //   } finally { setLoading(false); }
    // };

  //   return (
  //     <Modal show={show} onHide={onClose} centered>
  //       <Form onSubmit={submit}>
  //         <Modal.Header closeButton><Modal.Title>Register</Modal.Title></Modal.Header>
  //         <Modal.Body>
  //           <Form.Group className="mb-2"><Form.Label>Name</Form.Label>
  //             <Form.Control value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
  //           </Form.Group>
  //           <Form.Group className="mb-2"><Form.Label>Email</Form.Label>
  //             <Form.Control type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
  //           </Form.Group>
  //           <Form.Group className="mb-2"><Form.Label>Password</Form.Label>
  //             <Form.Control type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
  //           </Form.Group>
  //           {err && <div className="text-danger">{err}</div>}
  //         </Modal.Body>
  //         <Modal.Footer>
  //           <Button variant="secondary" onClick={onClose}>Close</Button>
  //           <Button type="submit" variant="primary" disabled={loading}>{loading ? "Please wait..." : "Register"}</Button>
  //         </Modal.Footer>
  //       </Form>
  //     </Modal>
  //   );
  // }
