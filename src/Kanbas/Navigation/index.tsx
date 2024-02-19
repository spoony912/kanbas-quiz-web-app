// imported to /src/Kanbas/index.tsx
//-----------------------------------------------------------------------------//
// Kanbas Naviagtion: 最左边
import { Link, useLocation } from "react-router-dom";
import "./index.css";
// fontswesome
import {
  FaTachometerAlt,
  FaRegUserCircle,
  FaBook,
  FaRegCalendarAlt,
  FaInbox,
  FaHistory,
  FaPaintBrush,
  FaUsers,
  FaQuestionCircle,
} from "react-icons/fa";
//-----------------------------------------------------------------------------//

function KanbasNavigation() {
  const links = [
    { label: "Account", icon: <FaRegUserCircle className="fs-2" /> },
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
    { label: "Courses", icon: <FaBook className="fs-2" /> },
    { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" /> },
    { label: "Inbox", icon: <FaInbox className="fs-2" /> },
    { label: "History", icon: <FaHistory className="fs-2" /> },
    { label: "Studio", icon: <FaPaintBrush className="fs-2" /> },
    { label: "Commons", icon: <FaUsers className="fs-2" /> },
    { label: "Help", icon: <FaQuestionCircle className="fs-2" /> },
  ];

  // hook
  const { pathname } = useLocation();

  return (
    <ul className="wd-kanbas-navigation d-none d-md-block">
      {links.map((link, index) => (
        <li
          // key for optimal
          key={index}
          className={pathname.includes(link.label) ? "wd-active" : ""} // className = "wd-active" depends on if pathname.includes(link.label)
        >
          <Link to={`/Kanbas/${link.label}`}>
            {link.icon} {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default KanbasNavigation;
