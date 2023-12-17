import { Link, usePage } from "@inertiajs/react";
import React from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";

export default function MyWebsites() {
  const websites = usePage().props.websites;
  const user = usePage().props.auth.user;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>My websites</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Websites</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {websites.map((website) => (
            <DropdownMenuItem key={website.id}>
              {website.name}
              {website.id == user.current_site_id && (
                <span className="text-green-500">✓</span>
              )}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={route("dashboard.websites.index")}>
              + Add new websites
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
