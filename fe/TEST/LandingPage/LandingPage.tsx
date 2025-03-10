"use client";
import * as React from "react";
import { Navbar } from "./Navbar";
import { SubNavbar } from "./SubNavbar";
import { HeroSection } from "./HeroSection";
import { FeaturedEvents } from "./FeaturedEvents";
import { WhyChooseUs } from "./WhyChooseUs";
import { InteractiveBanner } from "./InteractiveBanner";
import { Footer } from "./Footer";

export default function LandingPage() {
  return (
    <main className="overflow-hidden bg-white">
      <Navbar />
      <SubNavbar />
      <HeroSection />
      <FeaturedEvents />
      <div className="mt-8 mr-3.5 max-md:mr-2.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[64%] max-md:ml-0 max-md:w-full">
            <WhyChooseUs />
          </div>
          <div className="ml-5 w-[36%] max-md:ml-0 max-md:w-full">
            <InteractiveBanner />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
