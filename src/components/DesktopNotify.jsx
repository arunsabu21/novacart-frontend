export default function DesktopNotify({
  type = "info",         
  message,
  thumbnail,
  actionText,
  onAction,
}) {
  return (
    <div className="notify-container">
      <div className={`notify-info notify-default notify-content notify-pull-right notify-text-left notify-${type}`}>
        <div className="notify-info-message">

          {thumbnail && (
            <img
              draggable="false"
              className="notify-thumbnail"
              src={thumbnail}
              alt=""
            />
          )}

          <p className="notify-thumbnail-text">
            {message}
          </p>

          {actionText && (
            <button
              className="notify-action notify-button"
              onClick={onAction}
            >
              {actionText}
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
