import {Link} from "react-router-dom";
import React from "react";

const NavLink = ({ path,title}) => {
  return <Link className="block py-2 pl-3 pr-4 text-black font-semibold" to={path}>{title}</Link>;
};

export default NavLink;
