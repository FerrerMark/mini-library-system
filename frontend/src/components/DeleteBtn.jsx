const DeleteBtn = ({ onClick, id }) => {
  const handleClick = (event) => {
    event.stopPropagation();
    onClick(id);
  };

  return (
    <button onClick={handleClick} className="delete-btn">
      Delete
    </button>
  );
};

export default DeleteBtn;
