import '../css/EmptyState.css'
import { Link } from "react-router-dom";

export default function EmptyState({
  position,
  marginTop,
  svg,
  title,
  description,

  primaryText,
  primaryLink,
  primaryOnClick,

  secondaryText,
  secondaryLink,
  secondaryOnClick,

  icon
}) {
  return (
    <div
      className="empty-state"
      style={{
        justifyContent: position,
        marginTop: marginTop
      }}
    >
      <div className="empty-state-inner">

        <div className="empty-icon">
          {icon || svg}
        </div>

        <div className='empty-state-title'>{title}</div>
        <span>{description}</span>

        <div className="empty-actions">

          {primaryText && (
            primaryLink ? (
              <Link to={primaryLink} className="primary-btn">
                {primaryText}
              </Link>
            ) : primaryOnClick ? (
              <button
                type="button"
                className="primary-empty-state-btn"
                onClick={primaryOnClick}
              >
                {primaryText}
              </button>
            ) : null
          )}

          {secondaryText && (
            secondaryLink ? (
              <Link to={secondaryLink} className="secondary-btn">
                {secondaryText}
              </Link>
            ) : secondaryOnClick ? (
              <button
                type="button"
                className="secondary-btn"
                onClick={secondaryOnClick}
              >
                {secondaryText}
              </button>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
