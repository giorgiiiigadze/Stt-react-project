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
  secondaryText,
  secondaryLink,
  icon
}) {
  return (
    <div className="empty-state" 
    style={{
      justifyContent: position,
      marginTop: marginTop
    }}>
      <div className="empty-state-inner">

        <div className="empty-icon">
          {icon || svg}
        </div>

        <h3>{title}</h3>

        <p>{description}</p>

        <div className="empty-actions">
          {primaryText && primaryLink && (
            <Link to={primaryLink} className="primary-btn">
              {primaryText}
            </Link>
          )}

          {secondaryText && secondaryLink && (
            <Link to={secondaryLink} className="secondary-btn">
              {secondaryText}
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
