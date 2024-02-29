import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { BellIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";
import { Button } from "@/Components/Editor/Button";
import { Text } from "@/Components/Editor/Text";
import { Container } from "@/Components/Editor/Container";
import { Editor, Frame, Element } from "@craftjs/core";
import { Toolbox } from "@/Components/Editor/Toolbox";

import { Toolbar } from "@/Components/Editor/Toolbar";
import { Form } from "@/Components/Editor/Form";

export default function EditorPage({ auth, menu }) {
  return (
    <AuthenticatedLayout user={auth.user} header="Dashboard" menu={menu}>
      <Head title="Dashboard" />
      <Editor resolver={{ Button, Text, Container, Form }}>
        <div>
          <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
            <aside className="sticky top-8 hidden w-44 shrink-0 lg:block">
              <Toolbox />
            </aside>
            <main className="flex-1">
              {" "}
              <Frame>
                <Element
                  canvas
                  is={Container}
                  padding={5}
                  background="#eeeeee"
                  data-cy="root-container"
                >
                  {" "}
                  <Text text="Hello World" />
                </Element>
              </Frame>
            </main>

            <aside className="sticky top-8 hidden w-96 shrink-0 xl:block">
              <Toolbar />
            </aside>
          </div>
        </div>
      </Editor>
    </AuthenticatedLayout>
  );
}
