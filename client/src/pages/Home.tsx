import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Highlights from "@/components/Highlights";
import Schedule from "@/components/Schedule";
import Tournaments from "@/components/Tournaments";
import Finance from "@/components/Finance";
import News from "@/components/News";
import Rules from "@/components/Rules";
import JoinUs from "@/components/JoinUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Highlights />
      <Schedule />
      <Tournaments />
      <Finance />
      <News />
      <Rules />
      <JoinUs />
      <Contact />
      <Footer />
    </div>
  );
}
