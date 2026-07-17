export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      <nav className="flex items-center justify-between px-8 py-5 border-b border-red-600">
        <h1 className="text-3xl font-bold text-red-600">143 Studios</h1>

        <div className="hidden md:flex gap-8">
          <a href="#about" className="hover:text-red-500">About</a>
          <a href="#services" className="hover:text-red-500">Services</a>
          <a href="#contact" className="hover:text-red-500">Contact</a>
        </div>
      </nav>

      <section className="text-center py-28 px-6">

        <h1 className="text-6xl font-extrabold">
          Welcome to
        </h1>

        <h2 className="text-7xl text-red-600 font-black mt-4">
          143 Studios
        </h2>
        
        <p className="mt-5 text-xl text-gray-300 font-semibold">
  Founder & CEO — Wikram Ghafoor
</p>

        <p className="max-w-3xl mx-auto mt-8 text-gray-300 text-xl">
          Professional Music Label, Distribution,
          Publishing, Recording Studio and Digital
          Media Company.
        </p>

        <div className="mt-10">
          <a
            href="#contact"
            className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl text-lg font-bold"
          >
            Contact Us
          </a>
        </div>

      </section>
<section id="about" className="py-20 px-8 bg-neutral-950">
  <h2 className="text-4xl font-bold text-red-600 text-center">About</h2>
  <p className="mt-6 max-w-3xl mx-auto text-center text-gray-300">
    143 Studios is a professional music label focused on music distribution,
    publishing, recording, artist development and digital media.
  </p>
</section>

<section id="services" className="py-20 px-8">
  <h2 className="text-4xl font-bold text-red-600 text-center">Services</h2>

  <div className="grid md:grid-cols-3 gap-8 mt-12">
    <div className="border border-red-700 p-6 rounded-xl">
      <h3 className="text-2xl font-bold">Music Distribution</h3>
      <p className="mt-3 text-gray-300">
        Release music worldwide on major streaming platforms.
      </p>
    </div>

    <div className="border border-red-700 p-6 rounded-xl">
      <h3 className="text-2xl font-bold">Publishing</h3>
      <p className="mt-3 text-gray-300">
        Professional publishing and royalty management.
      </p>
    </div>

    <div className="border border-red-700 p-6 rounded-xl">
      <h3 className="text-2xl font-bold">Recording Studio</h3>
      <p className="mt-3 text-gray-300">
        High-quality recording, mixing and mastering services.
      </p>
    </div>
  </div>
</section>

<section id="contact" className="py-20 px-8 bg-neutral-950 text-center">
  <h2 className="text-4xl font-bold text-red-600">Contact</h2>

  <p className="mt-6">
    📧 143studiospakistan@gmail.com
  </p>

  <p className="mt-2">
    📞 +92 304 4457505
  </p>
</section>
    </main>
  );
}