import { FC, PropsWithChildren } from 'react'

const TypographyLarge: FC<PropsWithChildren> = ({ children }) => {
  return <div className="text-lg font-semibold">{children}</div>
}

export default TypographyLarge
