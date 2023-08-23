'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

interface FaqCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "switchable"
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
}

export function FaqButton ({variant="default", isAddedToCart = false, onSwitch}:FaqCardProps)  {
  const [isPending, startTransition] = React.useTransition()
  return (
          <Button
              variant='secondary'
              aria-label="delete faq"
              size="icon"
              className="h-8 w-full rounded-sm"
              onClick={() => {
                startTransition(async () => {
                  await onSwitch?.()
                })
              }}
              disabled={isPending}
              >
              {isPending ? (
                <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
                />
                ) : (
                  <Icons.trash className="mr-2 h-4 w-4" aria-hidden="true" />
                  )}
          </Button>
  )
}
