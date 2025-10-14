"use client"
import React, {ReactNode} from 'react'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'


interface ProviderProps {
  children: ReactNode;
  session: Session | null;
}

function Providers({children, session}: ProviderProps  ) {
  return (
    <div>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </div>
  )
}

export default Providers
