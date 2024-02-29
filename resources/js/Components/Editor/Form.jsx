import React from "react";
import { useNode } from "@craftjs/core";

export const Form = ({ background, padding = 0, children }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    alert("submitted");
  };
  return (
    <div
      ref={(ref) => connect(drag(ref))}
      style={{ margin: "5px 0", background, padding: `${padding}px` }}
    >
      <form onSubmit={handleSubmit}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <input type="text" name="name" id="name" className="form-input" />
            <input
              type="email"
              name="email"
              id="email"
              className="form-input"
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
