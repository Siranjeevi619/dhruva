import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../assets/fonts/dmsans.css";
import navData from "../../data/NavData";

const department = [
  { name: "ad", fullName: "Artificial Intelligence and Data Science" },
  { name: "cse", fullName: "Computer Science and Engineering" },
  { name: "cd", fullName: "Computer Science and Design" },
  { name: "civil", fullName: "Civil Engineering" },
  { name: "ct", fullName: "Computer Science and Technology" },
  {
    name: "cyber",
    fullName: "Computer Science and Engineering (Cyber Security)",
  },
  { name: "ece", fullName: "Electronics and Communication Engineering" },
  { name: "eee", fullName: "Electrical and Electronics Engineering" },
  { name: "ete", fullName: "Electronics and Telecommunication Engineering" },
  { name: "it", fullName: "Information Technology" },
  { name: "mba", fullName: "School of Management Studies" },
  { name: "mca", fullName: "School of Computer Applications" },
  { name: "mech", fullName: "Mechanical Engineering" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  const closeMenu = () => {
    if (isMobile) {
      setIsOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  const toggleDropdown = (menuName) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b bg-black shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:p-4">
        <NavLink to="/" className="text-xl font-bold" onClick={closeMenu}>
          <img
            src="https://res.cloudinary.com/dzpkbej9y/image/upload/v1739981304/Dhruva_iulxia.png"
            alt="Dhruva Logo"
            className="w-20 md:w-[100px]"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex flex-grow justify-center space-x-12">
          {navData.map((item, index) => (
            <li
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredMenu(item.name)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              {item.name === "Cultural Fest" ||
              item.name === "Technical Fest" ? (
                <>
                  <button className="dm-sans hover:scale-105 md:text-sm lg:text-lg border-b-2 border-transparent transition-all duration-300 hover:border-orange-400 text-white flex items-center">
                    {item.name} <ChevronDown className="ml-2" />
                  </button>
                  {hoveredMenu === item.name && (
                    <ul className="absolute left-0 mt-2 min-w-[280px] lg:min-w-[400px] bg-black border-gray-800 border-2 border-opacity-70 text-white shadow-lg rounded-md p-2 grid grid-cols-2 gap-2">
                      {item.name === "Cultural Fest" ? (
                        <>
                          <li>
                            <NavLink
                              to="/onstage"
                              className="block p-2 hover:bg-white hover:text-black rounded-md"
                            >
                              Onstage
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/offstage"
                              className="block p-2 hover:bg-white hover:text-black rounded-md"
                            >
                              Offstage
                            </NavLink>
                          </li>
                        </>
                      ) : (
                        department.map((dept, i) => (
                          <li key={i}>
                            <NavLink
                              to={`/technicalFest/${dept.name}`}
                              className="block p-2 dm-sans hover:bg-gray-800"
                            >
                              {dept.fullName}
                            </NavLink>
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.route}
                  className="dm-sans hover:scale-105 md:text-sm lg:text-lg border-b-2 border-transparent transition-all duration-300 hover:border-orange-400 text-white"
                >
                  {item.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button variant="ghost" onClick={toggleMenu}>
            <Menu className="w-10 h-10 text-white" />
          </Button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75"
          onClick={toggleMenu}
        ></div>
      )}

   
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black shadow-lg transform transition-transform duration-300 flex flex-col overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center ps-4 py-4">
          <h2 className="text-white text-xl font-semibold dm-sans">Menu</h2>
          <Button variant="ghost" onClick={toggleMenu}>
            <X className="w-7 h-7 ms-5 flex text-white" />
          </Button>
        </div>

        <ul className="flex flex-col items-start space-y-4 mt-5 px-4">
          {navData.map((item, index) => (
            <li key={index} className="w-full dm-sans">
              {item.name === "Cultural Fest" ||
              item.name === "Technical Fest" ? (
                <>
                  <button
                    className="text-white text-lg hover:text-orange-400 flex items-center w-full"
                    onClick={() => toggleDropdown(item.name)}
                  >
                    {item.name} <ChevronDown className="ml-2" />
                  </button>
                  {openDropdown === item.name && (
                    <ul className="bg-gray-800 text-white mt-2 space-y-2 p-2">
                      {item.name === "Cultural Fest" ? (
                        <>
                          <li>
                            <NavLink
                              to="/onstage"
                              className="block p-2 hover:bg-white hover:text-black rounded-md"
                              onClick={(e) => e.stopPropagation()} // Keeps menu open
                            >
                              Onstage
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/offstage"
                              className="block p-2 hover:bg-white hover:text-black rounded-md"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Offstage
                            </NavLink>
                          </li>
                        </>
                      ) : (
                        department.map((dept, i) => (
                          <li key={i}>
                            <NavLink
                              to={`/technicalFest/${dept.name}`}
                              className="block p-2 hover:bg-white hover:text-orange-400"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {dept.fullName}
                            </NavLink>
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.route}
                  className="text-white text-lg hover:text-orange-400 block"
                  onClick={closeMenu}
                >
                  {item.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
