import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Head, useForm, usePage } from "@inertiajs/react";
import { set } from "date-fns";

export default function UploadFile() {
  const { flash } = usePage().props;

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm();

  // api call to post route
  const submit = (e) => {
    e.preventDefault();

    post(route("files.create"), {
      onSuccess: (page) => {
        console.log(page);
      },
      onError: (errors) => {
        console.log(errors);
      },
    });

    setData("file", null);
  };
  return (
    <div>
      <form onSubmit={submit}>
        {/* File input */}
        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="file-upload">Picture</Label>
            <Input
              id="file-upload"
              type="file"
              onChange={(e) => setData("file", e.target.files[0])}
            />
          </div>
        </div>
        <Button onClick={submit} className="mt-4">
          Submit
        </Button>
      </form>
      {flash.success && (
        <div className="mt-4 text-sm text-neutral-700">{flash.success}</div>
      )}
      {flash.error && (
        <div className="mt-4 text-sm text-neutral-700">{flash.error}</div>
      )}
      {errors.file && (
        <div className="mt-4 text-sm text-neutral-700">{errors.file}</div>
      )}
      {/* {JSON.stringify(flash)}
      {JSON.stringify(errors)} */}
    </div>
  );
}
