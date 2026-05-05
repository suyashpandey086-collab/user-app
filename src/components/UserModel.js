function UserModal({
  show,
  mode,
  name, setName,
  email, setEmail,
  phoneNumber, setPhoneNumber,
  address, setAddress,
  onSave,
  onClose
}) {

  if (!show) return null;

  return (
    <div className="modal show fade d-block">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              {mode === "add" ? "Add User" :
               mode === "edit" ? "Edit User" : "View User"}
            </h5>

            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">

            <input className="form-control mb-2"
              value={name}
              disabled={mode==="view"}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
            />

            <input className="form-control mb-2"
              value={email}
              disabled={mode==="view"}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
            />

            <input className="form-control mb-2"
              value={phoneNumber}
              disabled={mode==="view"}
              onChange={e => setPhoneNumber(e.target.value)}
              placeholder="Phone"
            />

            <input className="form-control"
              value={address}
              disabled={mode==="view"}
              onChange={e => setAddress(e.target.value)}
              placeholder="Address"
            />

          </div>

          <div className="modal-footer">

            {mode !== "view" && (
              <button className="btn btn-success" onClick={onSave}>
                Save
              </button>
            )}

            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default UserModal;