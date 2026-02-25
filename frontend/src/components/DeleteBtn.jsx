const DeleteBtn = ({ onClick, id }) => {
  return (
    <button onClick={() => onClick(id)} className="delete-btn">
      Delete
    </button>
  );
};

export default DeleteBtn;
