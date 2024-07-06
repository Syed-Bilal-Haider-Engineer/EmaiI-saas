"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Toolbar() {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-5">
      <Button color="primary" className="text-lg px-4 py-2 rounded-md hover:bg-opacity-80">
        Start Trials
      </Button>
      {user ? (
        <Link href="/dashboard">
          <Image 
            src={user.imageUrl} 
            width={40}
            height={40} 
            alt="User Image"
            className="rounded-full"
          />
        </Link>
      ) : (
        <Link href="/login">
          <span className="text-blue-500 hover:underline cursor-pointer">Login</span>
        </Link>
      )}
    </div>
  );
}

export default Toolbar;
