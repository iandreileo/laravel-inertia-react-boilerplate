import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { Icons } from "@/Components/Icons";
import InputError from "@/Components/InputError";
import { Checkbox } from "@/shadcn/ui/checkbox";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      <div className="grid gap-6">
        <form onSubmit={submit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={processing}
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
              />
              <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="********"
                type="password"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={processing}
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
              />
              <InputError message={errors.password} className="mt-2" />
            </div>

            {/* TODO: Solve this */}
            {/* <div className="flex items-center space-x-2 my-2">
              <Checkbox
                id="remember"
                checked={data.remember}
                onCheckedChange={(e) => setData("remember", e.target.checked)}
              />
              <label
                htmlFor="remember"
                className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div> */}

            <Button disabled={processing}>
              {processing && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
          </div>
        </form>
        {canResetPassword && (
          <Link
            href={route("password.request")}
            className="text-center underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Forgot your password?
          </Link>
        )}
        <div className="text-center">
          <Link
            href={route("register")}
            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Or register a new account
          </Link>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={processing}>
          {processing ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          Github
        </Button>
      </div>
    </GuestLayout>
  );
}
