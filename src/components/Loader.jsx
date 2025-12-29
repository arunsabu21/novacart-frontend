import "../App.css";

function Loader() {
  return (
    <div className="loader-animation-container">
      <div className="spinner-container">
        <div className="nova-spinner">
          <svg class="circle-loader" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45"></circle>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Loader;
