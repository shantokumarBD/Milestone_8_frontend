"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function InputFieldgroup() {
  const handleCreateuser = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");

    try {
      const res = await fetch(`http://localhost:5000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status: ${res.status}`);
      }

      const data = await res.json();
      console.log("User created:", data);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error("Failed to create user:", err);
    }
    
  };
  return (
    <form onSubmit={handleCreateuser}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
          <Input 
          name="name"
          id="fieldgroup-name" 
          placeholder="Jordan Lee" 
          required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
          <Input
            name="email"
            id="fieldgroup-email"
            type="email"
            placeholder="name@example.com"
            required
          />
          <FieldDescription>
            We&apos;ll send updates to this address.
          </FieldDescription>
        </Field>
        <Field orientation="horizontal">
          <Button type="submit">Add User</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
