"use client"
import React, {ReactNode} from 'react'
import { SessionProvider } from 'next-auth/react'


interface ProviderProps {
  children: ReactNode;
  session: any;
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
