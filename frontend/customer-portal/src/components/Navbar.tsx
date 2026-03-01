import { Menu, X, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const navItems = [
        { id: "home", label: "Home", href: "/" },
        { id: "browse-menu", label: "Browse Menu", href: "/menu" },
        { id: "special", label: "Special", href: "/special" },
        { id: "about", label: "About", href: "/about" },
        { id: "reserve-table", label: "Reserve Table", href: "/reserve-table" },
    ];

    const getActiveNav = () => {
        const current = navItems.find(
            (item) => item.href !== "#" && location.pathname === item.href
        );
        return current ? current.id : "";
    };

    return (
        <header
            className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 py-3"
                    : "bg-white py-5 border-b border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* LOGO */}
                <Link to="/" className="flex items-center gap-2 group drop-shadow-sm">
                    <img src="/logo.png" alt="Order UK" className="h-9 transition-transform duration-300 group-hover:scale-105" />
                </Link>

                {/* DESKTOP MENU */}
                <nav className="hidden lg:flex items-center bg-gray-50/80 backdrop-blur-sm border border-gray-100 rounded-full px-2 py-1.5 shadow-sm">
                    {navItems.map((item) => {
                        const isActive = getActiveNav() === item.id;
                        return item.href === "#" ? (
                            <span
                                key={item.id}
                                className="text-sm font-medium px-5 py-2 rounded-full text-gray-400 cursor-not-allowed"
                            >
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                key={item.id}
                                to={item.href}
                                className={`text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 ${isActive
                                        ? "bg-primary text-white shadow-md shadow-primary/20"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-white"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* DESKTOP ACTION BUTTONS */}
                <div className="hidden lg:flex items-center gap-3">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-full hover:bg-gray-200 transition duration-200 text-sm font-medium"
                            >
                                <User size={16} />
                                <span className="max-w-[100px] truncate">{user?.name || user?.email}</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="group flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                        >
                            <span className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                            Login / Signup
                        </Link>
                    )}
                </div>

                {/* MOBILE HAMBURGER */}
                <button
                    className="lg:hidden text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-colors"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* MOBILE DROPDOWN */}
            <div
                className={`lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out origin-top ${open ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
                    }`}
            >
                <div className="px-6 py-6 flex flex-col gap-2">
                    {navItems.map((item) => {
                        const isActive = getActiveNav() === item.id;
                        return item.href === "#" ? (
                            <span
                                key={item.id}
                                className="w-full text-left font-medium px-4 py-3 rounded-xl text-gray-400 cursor-not-allowed"
                            >
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                key={item.id}
                                to={item.href}
                                onClick={() => setOpen(false)}
                                className={`w-full text-left font-medium px-4 py-3 rounded-xl transition duration-200 ${isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    <div className="h-px bg-gray-100 my-4"></div>

                    {isAuthenticated ? (
                        <div className="grid grid-cols-2 gap-3">
                            <Link
                                to="/dashboard"
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium"
                            >
                                <User size={18} className="text-gray-500" />
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl font-medium"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-center gap-2 bg-gray-900 text-white w-full py-3.5 rounded-xl font-medium shadow-md shadow-gray-900/10"
                        >
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            Login / Signup
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
