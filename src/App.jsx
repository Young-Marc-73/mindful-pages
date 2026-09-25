import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AnnouncementBar from "./components/sections/AnnouncementBar";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import CoverMarquee from "./components/sections/CoverMarquee";
import Approach from "./components/sections/Approach";
import JournalGrid from "./components/sections/JournalGrid";
import FeaturedJournal from "./components/sections/FeaturedJournal";
import WhySection from "./components/sections/WhySection";
import AppSection from "./components/sections/AppSection";
import Newsletter from "./components/sections/Newsletter";
import BookUpdates from "./components/sections/BookUpdates";
import AboutMarc from "./components/sections/AboutMarc";
import Privacy from "./components/sections/Privacy";
import Footer from "./components/sections/Footer";

export default function App() {
  const [showBar, setShowBar] = useState(true);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <AnimatePresence>
        {showBar && <AnnouncementBar key="bar" onClose={() => setShowBar(false)} />}
      </AnimatePresence>
      <Navbar barVisible={showBar} />
      <main>
        <Hero />
        <CoverMarquee />
        <Approach />
        <JournalGrid />
        <BookUpdates />
        <FeaturedJournal />
        <WhySection />
        <AppSection />
        <AboutMarc />
        <Newsletter />
        <Privacy />
      </main>
      <Footer />
    </div>
  );
}
