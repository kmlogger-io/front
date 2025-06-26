'use client'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'
import { ArrowLeftIcon, Cross2Icon } from '@radix-ui/react-icons'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const dialogOverlayVariants = cva(
  'z-[2000] fixed inset-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-black/80',
        blur: 'backdrop-blur-sm bg-black/40',
        dark: 'bg-black/90',
        light: 'bg-white/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface DialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
    VariantProps<typeof dialogOverlayVariants> {}

function DialogOverlay({
  ref,
  className,
  variant,
  ...props
}: DialogOverlayProps & {
  ref?: React.RefObject<React.ElementRef<typeof DialogPrimitive.Overlay> | null>
}) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(dialogOverlayVariants({ variant }), className)}
      id="overlay-dialog"
      {...props}
    />
  )
}
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const dialogContentVariants = cva(
  'z-[2100] fixed left-[50%] top-[50%] grid translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-4xl',
  {
    variants: {
      variant: {
        default: 'bg-background border-border',
        destructive:
          'bg-destructive text-destructive-foreground border-destructive',
        success: 'bg-green-50 border-green-200',
        warning: 'bg-yellow-50 border-yellow-200',
      },
      size: {
        default: 'w-full max-w-lg p-6',
        sm: 'w-full max-w-sm p-4',
        lg: 'w-full max-w-2xl p-8',
        xl: 'w-full max-w-4xl p-8',
        full: 'w-[95vw] h-[95vh] py-6 px-4 md:px-32',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  showCloseButton?: boolean
  showBackButton?: boolean
  onGoBack?: () => void
}

function DialogContent({
  ref,
  className,
  children,
  variant,
  size,
  showCloseButton = true,
  showBackButton = false,
  onGoBack,
  ...props
}: DialogContentProps & {
  ref?: React.RefObject<React.ElementRef<typeof DialogPrimitive.Content> | null>
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        onInteractOutside={
          props.onInteractOutside
            ? props.onInteractOutside
            : e => e.preventDefault()
        }
        className={cn(dialogContentVariants({ variant, size }), className)}
        {...props}
        onCloseAutoFocus={event => {
          event.preventDefault()
          document.body.style.pointerEvents = ''
        }}
      >
        {showBackButton && (
          <button
            type="button"
            onClick={onGoBack}
            className={cn(
              'absolute cursor-pointer w-8 h-8 shadow-lg bg-card left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
              variant === 'destructive' &&
                'data-[state=open]:bg-destructive-foreground data-[state=open]:text-destructive',
              variant === 'default' &&
                'data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'
            )}
            data-testid="botao-voltar-dialog"
          >
            <ArrowLeftIcon className="h-5 w-5 text-card-foreground" />
            <span className="sr-only">Go back</span>
          </button>
        )}
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            className={cn(
              'absolute cursor-pointer w-8 h-8 shadow-lg bg-card right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
              variant === 'destructive' &&
                'data-[state=open]:bg-destructive-foreground data-[state=open]:text-destructive',
              variant === 'default' &&
                'data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'
            )}
            data-testid="botao-fechar-dialog"
          >
            <Cross2Icon className="h-5 w-5 text-card-foreground" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-1.5 text-center sm:text-left',
        className
      )}
      {...props}
    />
  )
}
DialogHeader.displayName = 'DialogHeader'

function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className
      )}
      {...props}
    />
  )
}
DialogFooter.displayName = 'DialogFooter'

function DialogTitle({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
  ref?: React.RefObject<React.ElementRef<typeof DialogPrimitive.Title> | null>
}) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  )
}
DialogTitle.displayName = DialogPrimitive.Title.displayName

function DialogDescription({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> & {
  ref?: React.RefObject<React.ElementRef<
    typeof DialogPrimitive.Description
  > | null>
}) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogClose,
  DialogContent,
  type DialogContentProps,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  type DialogOverlayProps,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
