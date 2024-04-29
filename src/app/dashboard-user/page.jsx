'use client'
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

const DashboardUser = () => {

  const { data: session, status } = useSession()

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <pre>{JSON.stringify({session}, null, 2)}</pre>
      </div>
    </div>
  )
}

export default DashboardUser