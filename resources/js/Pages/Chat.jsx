import ChatComponent from "@/Components/Files/Chat";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Chat({ auth, menu, file }) {
  return (
    <AuthenticatedLayout user={auth.user} menu={menu}>
      <Head title="Dashboard" />
      {/* {JSON.stringify(file)} */}
      <div className="md:grid md:grid-cols-2">
        <div>test</div>
        <div>
          <ChatComponent />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
