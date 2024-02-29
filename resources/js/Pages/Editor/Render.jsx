import { useEffect } from "react";
import { useEditor, Frame, Element, Editor } from "@craftjs/core";
import Render from "@/Components/Editor/Render";
import { Button } from "@/Components/Editor/Button";
import { Text } from "@/Components/Editor/Text";
import { Container } from "@/Components/Editor/Container";
import { Toolbox } from "@/Components/Editor/Toolbox";

import { Toolbar } from "@/Components/Editor/Toolbar";
import { Form } from "@/Components/Editor/Form";
export default function RenderPage({ content }) {
  return (
    <Editor resolver={{ Button, Text, Container, Form }} enabled={false}>
      <Frame data={content}></Frame>
    </Editor>
  );
}
