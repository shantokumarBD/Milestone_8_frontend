"use client";

import React from 'react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export interface User {
  _id: string
  name: string
  email: string
  password?: string
  [key: string]: any
}

interface UserCardProps {
  user: User
}

const UserCard = ({ user }: UserCardProps) => {
  const router = useRouter()

  const handleEdit = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
        }),
      });
      const data = await res.json();
      console.log(data);
      router.refresh();
    } catch (err) {
      console.error("Error editing user:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      router.refresh();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={`https://avatar.vercel.sh/${encodeURIComponent(user.name || user.email || user._id)}`}
        alt={user.name || 'User avatar'}
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">User</Badge>
        </CardAction>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription className="space-y-1">
          <span className="block text-foreground">{user.email}</span>
          {user.password && (
            <span className="block text-xs text-muted-foreground">
              Password: {user.password}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-2">
        <Link href={`/users/${user._id}`}>
          <Button variant="outline" className="w-fit">
            View Details
          </Button>
        </Link>
       
          <Button 
          onClick={()=> handleEdit(user._id)}
          variant="outline" className="w-fit">
            edit
          </Button>

          <Button 
          onClick={()=> handleDelete(user._id)}
          variant="outline" className="w-fit">
            delete
          </Button>
      </CardFooter>
    </Card>
  )
}

export default UserCard