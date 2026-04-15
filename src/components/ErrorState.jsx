function ErrorState({ message }) {
  return (
    <div className="center-screen error-wrap">
      <h2>Unable to load dashboard</h2>
      <p>{message}</p>
    </div>
  );
}

export default ErrorState;
