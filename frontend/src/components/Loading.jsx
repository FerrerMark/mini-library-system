const containerStyle = {
  height: '75%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const spinnerStyle = {
  width: '40px',
  height: '40px',
  border: '4px solid #ccc',
  borderTop: '4px solid #333',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginBottom: '10px',
};

const loadingMessage = {
    fontSize: '14px',
    fontWeight: 'bold',
    width: '185px',
    textAlign: 'center',
}

const SpinnerKeyframes = () => (
  <style>
    {`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}
  </style>
);

const Loading = ({ message = 'Loading...' }) => {
  return (
    <>
      <SpinnerKeyframes />
      <div className="loading" style={containerStyle}>
        <div style={spinnerStyle}></div>
        <div style={loadingMessage}>{message}</div>
      </div>
    </>
  );
};

export default Loading;
