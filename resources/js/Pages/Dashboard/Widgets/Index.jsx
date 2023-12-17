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
import { formatDate } from "@/lib/utils";

export default function Index({ auth, roles, menu, widgets }) {
  return (
    <AuthenticatedLayout user={auth.user} header="Widgets" menu={menu}>
      <Head title="Widgets" />

      <Dialog>
        <DialogTrigger className="my-4 ">
          <Button>Create new widget</Button>
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
        <TableCaption>A list of your widgets.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Scope</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {widgets.map((widget) => (
            <TableRow key={widget.id}>
              <TableCell>
                {widget.name} (ID: {widget.id})
              </TableCell>
              <TableCell>{widget.type}</TableCell>
              <TableCell>{formatDate(widget.created_at)}</TableCell>
              <TableCell>{widget.status}</TableCell>
              <TableCell>{widget.scope}</TableCell>
              <TableCell>
                <Button>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AuthenticatedLayout>
  );
}
