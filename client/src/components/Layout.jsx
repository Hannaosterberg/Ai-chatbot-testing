import { Link, NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Start" },
  { to: "/lokaler", label: "Lediga lokaler" },
  { to: "/hyr-ut", label: "Hyr ut lokal" },
  { to: "/priser", label: "Prismodeller" },
  { to: "/faq", label: "FAQ" },
  { to: "/blogg", label: "Blogg" },
  { to: "/om-oss", label: "Om oss" }
];

export function Layout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/" style={{ fontWeight: 700 }}>Nordic Space</Link>
          <div className="links">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
                  padding: "8px 10px",
                  borderRadius: "8px",
                  background: isActive ? "#1e293b" : "transparent",
                  color: "#fff"
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <Outlet />

      <footer>
        <div className="content">
          <strong>Nordic Space AB</strong>
          <span>Org nr: 559999-1234</span>
          <span>Telefon: 08-123 45 67</span>
          <span>E-post: hej@nordicspace.se</span>
          <span>Länkar: <Link to="/faq">FAQ</Link> · Integritet · Villkor</span>
        </div>
      </footer>
    </>
  );
}
