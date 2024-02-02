import { FC, PropsWithChildren } from 'react'

const TypographyMuted: FC<PropsWithChildren> = ({ children }) => {
  return <p className="text-sm text-muted-foreground">{children}</p>
}

export default TypographyMuted
