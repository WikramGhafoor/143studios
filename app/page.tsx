import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MissionVision from "@/components/MissionVision";
import Services from "@/components/Services";
import Artists from "@/components/Artists";
import Releases from "@/components/Releases";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      <Header />

      <Hero />

      <About />

      <MissionVision />

      <Services />

      <Artists />

      <Releases />

      <Contact />

      <Footer />

    </main>
  );
}