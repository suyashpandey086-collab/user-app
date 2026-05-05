function UserTable({ users, onEdit, onDelete, onView }) {

  return (
    <table className="table table-bordered table-striped">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.phoneNumber}</td>
            <td>{u.address}</td>

            <td>
              <button className="btn btn-info btn-sm me-2" onClick={() => onView(u)}>
                View
              </button>

              <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(u)}>
                Edit
              </button>

              <button className="btn btn-danger btn-sm" onClick={() => onDelete(u.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;