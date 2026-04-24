"use client"

import { useEffect, useRef } from "react"
import { toast } from "sonner"

export function FormMessageToast({ message }: { message: string }) {
  const toastShown = useRef<string | null>(null)

  useEffect(() => {
    if (message && toastShown.current !== message) {
      toast.error(message)
      toastShown.current = message
    }
  }, [message])

  return null
}
