import FilesListing from "@/Components/Files/FilesListing";
import UploadFile from "@/Components/Files/UploadFile";
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

export default function Dashboard({ auth, roles, menu, files }) {
  return (
    <AuthenticatedLayout user={auth.user} header="Dashboard" menu={menu}>
      <Head title="Dashboard" />

      <Dialog>
        <DialogTrigger className="my-4 ">
          <Button>Upload a new file</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import a new document</DialogTitle>
            <DialogDescription>Upload your document.</DialogDescription>
          </DialogHeader>
          <UploadFile />
        </DialogContent>
      </Dialog>
      <FilesListing files={files} />
    </AuthenticatedLayout>
  );
}
