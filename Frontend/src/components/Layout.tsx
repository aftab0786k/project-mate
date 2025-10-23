import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";

// Utility to merge class names
const cn = (...classes: (string | undefined | boolean)[]) => {
  return classes.filter(Boolean).join(" ");
};

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // ✅ Check login status from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]); // re-check whenever route changes

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // clear JWT token
    localStorage.removeItem("user");  // optional: clear user info
    setIsLoggedIn(false);
    navigate("/login"); // redirect to login
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white font-bold">
              PM
            </span>
            <span className="text-lg font-semibold tracking-tight">
              ProjectMate
            </span>
          </Link>

          {/* NAVIGATION */}
          <nav className="flex items-center gap-2">
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors",
                      isActive && "text-gray-900 font-semibold"
                    )
                  }
                >
                  Login
                </NavLink>
                <Button asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </>
            ) : (
              <Button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
              >
                Logout
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ProjectMate. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
