import React, { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface PageProps {
  params: Promise<{ userId: string }>
}

async function UserDetails({ userId }: { userId: string }) {
  try {
    const res = await fetch(`http://localhost:5000/users/${userId}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      return <p className="text-center text-muted-foreground">User not found.</p>
    }

    const user = await res.json()

    if (!user) {
      return <p className="text-center text-muted-foreground">User not found.</p>
    }

    return (
      <div className="mx-auto max-w-md rounded-xl border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="mt-2 text-muted-foreground">{user.email}</p>
        <div className="mt-6">
          <Link href="/users">
            <Button variant="outline">Back to Users</Button>
          </Link>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching user:', error)
    return <p className="text-center text-destructive">Failed to load user details.</p>
  }
}

const UserDetailsPage = async ({ params }: PageProps) => {
  const { userId } = await params

  return (
    <div className="container mx-auto px-4 py-10">
      <Suspense fallback={<p className="text-center">Loading user details...</p>}>
        <UserDetails userId={userId} />
      </Suspense>
    </div>
  )
}

export default UserDetailsPage