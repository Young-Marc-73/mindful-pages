import StrategicThinkingPage, { StrategicThinkingFeature, StrategicThinkingStart, StrategicThinkingDownload, StrategicThinkingLicense } from "./pages/StrategicThinking";
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
import ResourcePage, { resources } from "./pages/Resources";

import { journals } from "./data/journals";
import { apps, bookPaths } from "./data/pages";
import { BooksPage, BookPage, AppsPage, AppPage, AuthorPage, AppsGrid, Intro } from "./pages/Pages";

export default function App({ path = typeof window === "undefined" ? "/" : window.location.pathname } = {}) {
  const [showBar, setShowBar] = useState(true);

  path = path.replace(/\/$/, "") || "/";
  const journal = journals.find(j => bookPaths[j.id] === path);
  const app = apps.find(a => "/apps/" + a.slug === path);
  const home = path === "/";
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <AnimatePresence>
        {showBar && <AnnouncementBar key="bar" onClose={() => setShowBar(false)} />}
      </AnimatePresence>
      <Navbar barVisible={showBar} />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content" className={home ? "" : "pt-40 sm:pt-44"}>
        {home ? <>
        <Hero />
        <StrategicThinkingFeature />
        <CoverMarquee />
        <Approach />
        <JournalGrid />
        <BookUpdates />
        <FeaturedJournal />
        <WhySection />
        <AppSection />
        <section className="container-page py-16"><div className="mb-8"><h2 className="font-serif text-4xl">Tools for your business</h2><p className="mt-4 text-charcoal-muted">Explore the apps and their current availability.</p></div><AppsGrid /></section>
        <AboutMarc />
        <Newsletter />
        </> : path === "/strategic-thinking" ? <StrategicThinkingPage/> : path === "/strategic-thinking/start" ? <StrategicThinkingStart/> : path === "/strategic-thinking/download" ? <StrategicThinkingDownload/> : path === "/strategic-thinking/license" ? <StrategicThinkingLicense/> : resources[path] ? <ResourcePage resource={resources[path]}/> : journal ? <BookPage journal={journal}/> : app ? <AppPage app={app}/> : path === "/books" ? <BooksPage/> : path === "/apps" ? <AppsPage/> : path === "/about-the-author" ? <AuthorPage/> : path === "/approach" ? <><div className="container-page"><Intro label="The method" title="Knowledge. Understanding. Wisdom. Evaluation."><p>One repeatable way to gather what matters, understand it, act and learn.</p></Intro></div><Approach/></> : <div className="container-page pb-20"><Intro label="Page not found" title="Let’s find your next page."><a href="/books" className="btn-primary">Explore the books</a></Intro></div>}
        <Privacy />
      </main>
      <Footer />
    </div>
  );
}
