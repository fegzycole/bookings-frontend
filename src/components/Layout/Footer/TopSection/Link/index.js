import React from "react";

const Link = ({ linkPath, linkText }) => (
  <a href={linkPath} className="text-sm lg:text-lg mb-4 font-light">
    {linkText}
  </a>
);

export default Link;