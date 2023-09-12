import { Calendar } from "@/shadcn/ui/calendar";
import { Link, Head } from "@inertiajs/react";
import { useState } from "react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
  const [date, setDate] = useState(new Date());
  return (
    <>
      <Head title="Welcome" />
      {/* align horizontal and vertical */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold">Welcome</h1>
          <p className="text-xl mt-4">
            You're running Laravel v{laravelVersion} on PHP v{phpVersion}.
          </p>
          <p className="text-xl mt-4">
            Visit the <Link href="/dashboard">Dashboard</Link>.
          </p>
          <p className="text-xl mt-4">
            <Link href="/login">Login</Link>
          </p>
          <p className="text-xl mt-4">
            <Link href="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
}
