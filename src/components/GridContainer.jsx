import React from "react";

export default function GridContainer({ children, className }) {
  return (
    <div
      className={
        "grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-3 " +
        className
      }
    >
      {children}
    </div>
  );
}
