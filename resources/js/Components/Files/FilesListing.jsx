import UploadFile from "@/Components/Files/UploadFile";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";
export default function FilesListing({ files }) {
  return (
    <div>
      <Table>
        <TableCaption>A list of your files.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>File</TableHead>
            <TableHead>Uploaded at</TableHead>
            <TableHead>Size</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell className="font-medium">
                <Link href={route("documents.show", file.id)}>{file.name}</Link>
              </TableCell>
              <TableCell>
                {new Date(file.created_at).toLocaleString()}
              </TableCell>
              <TableCell>
                {(file.file_size / 1000000).toFixed(2)}
                MB
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
