import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <h1 className="text-3xl font-bold underline">All users data</h1>

      <div>
        <p>name</p>
        <p>email</p>
        <p>password</p>
        <Button variant="outline">update</Button>
        <Button variant="destructive">delete</Button>
      </div>

    </div>
  );
}
