import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthHook";
import styles from "./Layout.module.css";

function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const items = [
    { name: "Simple Component", path: "/", auth: true },
    { name: "Input Example", path: "/input-example", auth: true },
    { name: "Use State Example", path: "/use-state", auth: true },
    { name: "Output Example", path: "/output-example", auth: true },
    { name: "Note List", path: "/notes", auth: true },
    { name: "Use Effect", path: "/use-effect", auth: true },
    { name: "Http Example", path: "/http-example", auth: true },
    { name: "Logout", path: "/logout", auth: true },
  ];

  const goTo = (path: string) => {
    if (path === "/logout" && user) {
      logout();
      navigate("/login");
      return;
    }
    navigate(path);
  };

  return (
    <>
      <div className={styles.MainContainer}>
        <div className={styles.Navbar}>
          {!user ? (
            <div 
              className={`${styles.BarItem} 
              ${location.pathname === "/login" ? styles.Selected : ""}`} 
              onClick={() => goTo("/login")}>
              Login
            </div>
          ) : null}
          {items.map((item) =>
            item.auth && user ? (
              <div
                key={item.name}
                className={`${styles.BarItem} 
                    ${location.pathname === item.path ? styles.Selected : ""}`}
                onClick={() => goTo(item.path)}
              >
                {item.name}
              </div>
            ) : null
          )}
        </div>
      </div>
      <div className={styles.OutletContainer}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
