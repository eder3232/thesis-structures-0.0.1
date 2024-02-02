import { cn } from '@/lib/utils'
import { FC, PropsWithChildren } from 'react'
interface Props {
  className?: string
}

const TypographyP: FC<PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
      {children}
    </p>
  )
}

export default TypographyP
