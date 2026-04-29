'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import ProductEditorForm from '@/components/ui/ProductEditorForm'

export default function Page() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  if (!id) {
    return null
  }

  return <ProductEditorForm mode="edit" productId={id} />
}

