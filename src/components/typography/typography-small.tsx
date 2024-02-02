import { FC, PropsWithChildren } from 'react'

const TypographySmall: FC<PropsWithChildren> = ({ children }) => {
  return <small className="text-sm font-medium leading-none">{children}</small>
}

export default TypographySmall
