import React from "react";
import { useEditor, useNode } from "@craftjs/core";
import lz from "lzutf8";
import copy from "copy-to-clipboard";

export const Toolbar = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  return (
    <div>
      {" "}
      <button
        onClick={() => {
          const json = query.serialize();
          copy(json);
          // copy(lz.encodeBase64(lz.compress(json)));
        }}
      >
        Save
      </button>
    </div>
  );
};
