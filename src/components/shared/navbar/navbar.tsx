import Image from 'next/image'
import ModeToggle from './mode-toggle'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className="flex items-center justify-center h-16 border-b bg-background/95 backdrop-blur">
      <div className="container justify-between flex">
        {/* logo */}
        <Link href="/" className="flex items-center">
          <div className="flex gap-2 items-center">
            <Image src="/bocchi_right.png" alt="logo" height={30} width={30} />
            <div className="text-xl font-bold text-primary">eder3232</div>
          </div>
        </Link>

        <div>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

export default Navbar
