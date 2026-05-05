import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserTable from "./components/UserTable";
import UserModel from "./components/UserModel";

function App() {

  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState(""); // add | edit | view

  // ================= API URL =================

  // LOCAL API (for development)
  // const API_URL = "https://localhost:44379/api/user";

  // LIVE AZURE API (for production)
  const API_URL = "https://userapi-suyash123-asecbcgvfkedcnft.centralindia-01.azurewebsites.net/api/user";

  // ---------------- FETCH USERS ----------------
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  // ---------------- HANDLERS ----------------
  const handleAdd = () => {
    clearForm();
    setMode("add");
    setShowModal(true);
  };

  const handleEdit = (user) => {
    fillForm(user);
    setEditId(user.id);
    setMode("edit");
    setShowModal(true);
  };

  const handleView = (user) => {
    fillForm(user);
    setMode("view");
    setShowModal(true);
  };

  // ---------------- HELPERS ----------------
  const fillForm = (user) => {
    setName(user.name);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
    setAddress(user.address);
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setAddress("");
    setEditId(null);
  };

  // ---------------- DELETE ----------------
  const deleteUser = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      setUsers(prev => prev.filter(u => u.id !== id));
    })
    .catch(err => console.error("Delete error:", err));
  };

  // ---------------- ADD ----------------
  const addUser = () => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, phoneNumber, address })
    })
    .then(res => res.json())
    .then(newUser => {
      setUsers(prev => [...prev, newUser]);
      setShowModal(false);
      clearForm();
    })
    .catch(err => console.error("Add error:", err));
  };

  // ---------------- UPDATE ----------------
  const updateUser = () => {
    fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, phoneNumber, address })
    })
    .then(res => res.json())
    .then(updatedUser => {
      setUsers(prev =>
        prev.map(u => (u.id === editId ? updatedUser : u))
      );
      setShowModal(false);
      clearForm();
    })
    .catch(err => console.error("Update error:", err));
  };

  // ---------------- SAVE ----------------
  const saveUser = () => {
    if (mode === "add") {
      addUser();
    } else if (mode === "edit") {
      updateUser();
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="container mt-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-center">User List</h2>
        <button className="btn btn-primary" onClick={handleAdd}>
          Add User
        </button>
      </div>

      {/* TABLE COMPONENT */}
      <UserTable
        users={users}
        onEdit={handleEdit}
        onDelete={deleteUser}
        onView={handleView}
      />

      {/* MODAL COMPONENT */}
      <UserModel
        show={showModal}
        mode={mode}
        name={name} setName={setName}
        email={email} setEmail={setEmail}
        phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
        address={address} setAddress={setAddress}
        onSave={saveUser}
        onClose={() => setShowModal(false)}
      />

    </div>
  );
}

export default App;