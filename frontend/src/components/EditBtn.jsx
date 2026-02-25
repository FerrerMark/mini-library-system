const EditBtn = ({ onClick }) => {
  const handleClick = (event) => {
    event.stopPropagation();
    onClick(event);
  };

  return (
    <button className="edit-btn" onClick={handleClick}>
      Edit
    </button>
  );
};

export default EditBtn;
