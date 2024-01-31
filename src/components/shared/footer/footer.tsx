import Image from 'next/image'
import { SocialIcon } from 'react-social-icons'

const Footer = () => {
  return (
    <div className="h-36 absolute bottom-0 w-full border-t">
      <div className="container flex flex-col md:flex-row justify-center md:justify-between h-full items-center gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Image src="/bocchi_right.png" alt="logo" height={60} width={60} />
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">
                eder3232
              </div>
              <div className="text-sm text-muted-foreground">
                Tecnología para un mundo mejor.
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {/* SocialMediaIcons */}

          <SocialIcon
            url="https://www.tiktok.com/@eder_vlog"
            target="_blank"
            style={{ height: 35, width: 35 }}
          />
          <SocialIcon
            url="https://www.youtube.com/@ederEngine"
            target="_blank"
            style={{ height: 35, width: 35 }}
          />
          <SocialIcon
            style={{ height: 35, width: 35 }}
            url="https://www.youtube.com/@eder_3232"
            target="_blank"
          />
          <SocialIcon
            style={{ height: 35, width: 35 }}
            url="https://www.linkedin.com/in/eddy-eder-sucapuca-cruz-44b2681a2"
            target="_blank"
          />
          <SocialIcon
            style={{ height: 35, width: 35 }}
            url="https://github.com/eder3232"
            target="_blank"
          />
          <SocialIcon
            style={{ height: 35, width: 35 }}
            url="https://www.instagram.com/eder_3232/"
            target="_blank"
          />
        </div>
      </div>
    </div>
  )
}

export default Footer
