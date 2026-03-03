import './Loading.css';

const Loading = ({ fullScreen = false, text = 'Memuat...' }) => {
  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className="loading-content">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <span className="spinner-icon">🌿</span>
          </div>
          <p className="loading-text">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="loading-inline">
      <div className="spinner"></div>
      <span>{text}</span>
    </div>
  );
};

export default Loading;
