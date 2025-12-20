import '../../css/AudioTabs/AudioTabs.css';

export default function AudioTabs({ activeTab, setActiveTab, tabSections }) {
  const ICONS = {
    Transcription: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16v16H4z" />
        <line x1="8" y1="8" x2="16" y2="8" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="16" x2="12" y2="16" />
      </svg>
    ),
    Waveform: (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="2" y1="14" x2="2" y2="6" />
        <line x1="6" y1="18" x2="6" y2="2" />
        <line x1="10" y1="12" x2="10" y2="8" />
        <line x1="14" y1="18" x2="14" y2="2" />
        <line x1="18" y1="14" x2="18" y2="6" />
      </svg>
    ),
    Comments: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  };

  return (
    <div className="audio-tabs">
      {tabSections.map((label) => (
        <button
          key={label}
          className={`audio-tab ${activeTab === label ? "active" : ""}`}
          onClick={() => setActiveTab(label)}
        >
          <span className="tab-icon">{ICONS[label]}</span>
          <span className="tab-label">{label}</span>
        </button>
      ))}
    </div>
  );
}
