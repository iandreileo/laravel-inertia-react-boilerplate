import React, { useCallback } from "react";
import ContentEditable from "react-contenteditable";
import { useNode } from "@craftjs/core";

export const Text = ({ text, fontSize }) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
  } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <ContentEditable
        html={text}
        onChange={(e) =>
          setProp(
            (props) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))
          )
        }
        tagName="p"
        // style={{ fontSize: `${fontSize}px`, textAlign }}
      />
    </div>
  );
};
