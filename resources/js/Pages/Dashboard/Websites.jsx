import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/ui/dialog";
import { Button } from "@/shadcn/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";
import AddNewWebsite from "@/Components/Websites/AddNewWebsite";

export default function Websites({ auth, roles, menu, websites }) {
  return (
    <AuthenticatedLayout user={auth.user} header="Websites" menu={menu}>
      <Head title="Websites" />

      <Dialog>
        <DialogTrigger className="my-4 ">
          <Button>Create new website</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new website</DialogTitle>
            <DialogDescription>
              <AddNewWebsite />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Domains</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {websites.map((website) => (
            <TableRow key={website.id}>
              <TableCell>{website.name}</TableCell>
              <TableCell>{website.domains}</TableCell>
              <TableCell>{website.created_at}</TableCell>
              <TableCell>
                {website.id == auth.user.current_site_id && (
                  <span className="text-green-500">✓</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AuthenticatedLayout>
  );
}
