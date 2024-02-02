import { FC, PropsWithChildren } from 'react'

const TypographyBlockquote: FC<PropsWithChildren> = ({ children }) => {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  )
}

export default TypographyBlockquote
