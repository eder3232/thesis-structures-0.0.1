import React from 'react'

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { programs } from '@/shared/config/programs'
import TypographyH1 from '@/components/typography/typography-h1'
import TypographyP from '@/components/typography/typography-p'
import Link from 'next/link'

const Page = () => {
  return (
    <div className="flex flex-col gap-2">
      <TypographyH1>Programas:</TypographyH1>

      <TypographyP>Se ofrecen los siguientes programas:</TypographyP>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
        {programs.map((program) => (
          <Link href={program.path} key={program.name}>
            <Card key={program.name}>
              <CardHeader>
                <CardTitle>{program.name}</CardTitle>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  alt="Product 1"
                  // className="object-cover w-full h-60"
                  height={300}
                  src={program.imageURL}
                  // style={{
                  //   aspectRatio: '400/300',
                  //   objectFit: 'cover',
                  // }}
                  width={500}
                />
              </CardContent>
              <CardFooter>
                <Badge className="bg-blue-500 text-white">
                  {program.status}
                </Badge>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Page
