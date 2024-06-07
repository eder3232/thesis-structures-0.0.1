import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                  Bienvenido a Eder Estructures INC
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 m-auto">
                  Software para el cálculo de estructuras mediante el método
                  matricial de rigideces, no solo calculamos, sino mostramos el
                  proceso completo de cálculo, ayudando a los ingenieros a
                  comprender mejor los fundamentos del análisis estructural.
                </p>
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="/programs"
                >
                  Ver los programas
                </Link>
                {/* <Button className="px-8">Contact Sales</Button> */}
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border  border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Aprende como se hicieron
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Características clave
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Nuestra plataforma ofrece una variedad programas para tu óptimo
                aprendizaje en estructuras.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 md:grid-cols-3 items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">
                  Fácil de usar, cero configuración.
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  A diferencia de hojas de cálculo excel que suelen ser
                  complejas y difíciles de entender, nuestra plataforma es fácil
                  de usar y no requiere ninguna configuración.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Usalo en cualquier lugar</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Puedes usar este programa desde tu navegador, ya sea desde tu
                  computadora, tablet o celular.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Totalmente seguro</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Usalo en tu navegador, sin necesidad de descargar archivos de
                  dudosa procedencia u hojas excel con macros que pueden poner
                  en riesgo tu dispositivo.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Testimonials
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                What our customers are saying about our platform.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 md:grid-cols-3 items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">John Doe</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Acme Inc
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  The platform for rapid progress. Let your team focus on
                  shipping features instead of managing infrastructure with
                  automated CI/CD, built-in testing, and integrated
                  collaboration.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Jane Smith</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Beta Inc
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Beautifully designed components that you can copy and paste
                  into your apps. Accessible. Customizable. Open Source.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Robert Johnson</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Gamma LLC
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  The platform for rapid progress. Let your team focus on
                  shipping features instead of managing infrastructure with
                  automated CI/CD, built-in testing, and integrated
                  collaboration.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  ¿Listo para comenzar?
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Get your team up and running in less than 5 minutes.
                </p>
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Ver los programas
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Aprende como se hicieron
                </Link>
              </div>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  )
}
