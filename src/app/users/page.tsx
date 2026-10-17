import React from 'react'
import UserCard, { type User } from '@/components/UserCard'

const usersData = async (): Promise<User[]> => {
  try {
    const res = await fetch('http://localhost:3000/users', {
      cache: 'no-store',
    })
    if (!res.ok) return []
    const users = await res.json()
    return Array.isArray(users) ? users : []
  } catch (err) {
    console.error('Failed to fetch users:', err)
    return []
  }
}

const UsersPage = async () => {
  const users = await usersData()

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold tracking-tight">
        All Users Data
      </h1>

      {users.length === 0 ? (
        <p className="text-center text-muted-foreground">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}

export default UsersPage