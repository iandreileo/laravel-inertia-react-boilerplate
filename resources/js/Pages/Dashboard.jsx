import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, roles, menu }) {
  return (
    <AuthenticatedLayout user={auth.user} header="Dashboard" menu={menu}>
      <Head title="Dashboard" />
      test
    </AuthenticatedLayout>
  );
}
