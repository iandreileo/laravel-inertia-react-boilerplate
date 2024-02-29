import { useEffect } from "react";
import { useEditor, Frame, Element, Editor } from "@craftjs/core";

export default function Render({ content }) {
  const { actions, query } = useEditor();

  useEffect(() => {
    const json = lz.decompress(lz.decodeBase64(content));
    actions.deserialize(json);
  }, [content]); // Deserialize only when json changes

  return <Frame>{query.parseSerializedNode(content).toNodeTree().dom}</Frame>;
}
