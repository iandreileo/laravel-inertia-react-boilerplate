import React from "react";

import { Button } from "@/Components/Editor/Button";
import { Text } from "@/Components/Editor/Text";

import { Element, useEditor } from "@craftjs/core";
import { Container } from "@/Components/Editor/Container";
import { Form } from "./Form";
export const Toolbox = () => {
  const { connectors, query } = useEditor();
  return (
    <div>
      {/* <Button text="Click me" /> */}
      <button
        ref={(ref) => connectors.create(ref, <Text text="Hi world" />)}
        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150"
      >
        Text
      </button>
      <button
        ref={(ref) =>
          connectors.create(ref, <Element is={Container} padding={20} canvas />)
        }
        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150"
      >
        Container
      </button>
      <button
        ref={(ref) =>
          connectors.create(ref, <Element is={Form} padding={20} canvas />)
        }
        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150"
      >
        Form
      </button>
    </div>
  );
};
