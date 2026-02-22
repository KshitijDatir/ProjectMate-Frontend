import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Inbox, PlusCircle, Briefcase, Menu } from "lucide-react";

function DashboardSidebar({ activeView, onChange }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const touchStartX = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // Detect swipe to open/close sidebar
  useEffect(() => {
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      if (touch.clientX < 30 || isOpen) {
        touchStartX.current = touch.clientX;
      }
    };

    const handleTouchEnd = (e) => {
      if (touchStartX.current === null) return;
      const touchEnd = e.changedTouches[0];
      const diff = touchEnd.clientX - touchStartX.current;

      if (diff > 50 && !isOpen && touchStartX.current < 30) {
        setIsOpen(true);
      } else if (diff < -50 && isOpen) {
        setIsOpen(false);
      }
      touchStartX.current = null;
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isOpen]);

  // Close sidebar when clicking/tapping outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!isOpen) return;
      const sidebar = document.querySelector(".dashboard-sidebar");
      const handle = document.querySelector(".sidebar-handle");
      if (
        sidebar &&
        !sidebar.contains(e.target) &&
        handle &&
        !handle.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Sidebar handle – visible only on mobile */}
      {/* Sidebar handle – mobile only */}
      <div className="sidebar-handle" onClick={handleToggle}>
        <Menu size={18} />
      </div>

      {/* Sidebar panel */}
      <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <button
            onClick={() => { onChange("outgoing"); closeSidebar(); }}
            className={`sidebar-item ${activeView === "outgoing" ? "primary-item active" : "primary-item"}`}
          >
            <Send size={20} className="mr-3 flex-shrink-0" />
            <span className="sidebar-item-text">My Requests</span>
          </button>

          <button
            onClick={() => { onChange("incoming"); closeSidebar(); }}
            className={`sidebar-item ${activeView === "incoming" ? "accent-item active" : "accent-item"}`}
          >
            <Inbox size={20} className="mr-3 flex-shrink-0" />
            <span className="sidebar-item-text">My Projects</span>
          </button>

          <div className="border-t my-3" style={{ borderColor: 'var(--border)' }} />

          <button
            onClick={() => { navigate("/create-project?from=dashboard"); closeSidebar(); }}
            className="sidebar-item secondary-item"
          >
            <PlusCircle size={20} className="mr-3 flex-shrink-0" />
            <span className="sidebar-item-text">Create Project</span>
          </button>

          <button
            onClick={() => { navigate("/create-internship?from=dashboard"); closeSidebar(); }}
            className="sidebar-item primary-item"
          >
            <Briefcase size={20} className="mr-3 flex-shrink-0" />
            <span className="sidebar-item-text">Create Internship</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default DashboardSidebar;