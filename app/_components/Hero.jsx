import React from 'react'

function Hero() {
  return (
    <section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl text-black font-extrabold sm:text-5xl">
       Create your Form
        <strong className="font-extrabold text-primary sm:block"> In Seconds Not in Hours </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed text-gray-600">
      Our innovative platform is designed to streamline the form creation process, allowing you to quickly build and customize forms with ease.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-500 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="/dashboard"
        >
          + Create AI Form
        </a>

        <a
          className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-blue-500 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero