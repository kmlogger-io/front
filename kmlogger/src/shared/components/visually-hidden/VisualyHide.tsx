import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

function VisuallyHide({ children }: { children: React.ReactNode }) {
  return <VisuallyHidden.Root>{children}</VisuallyHidden.Root>
}

export default VisuallyHide
