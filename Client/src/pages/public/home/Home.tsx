import * as React from "react";
import { Reason } from "./components/Reason";
import { Feature } from "./components/Feature";
import { Hero } from "./components/Hero";

export default function LandingPage() {
    return (
        <main className="overflow-hidden bg-white">
            <Hero />
            <Feature />
            <div className="mt-8 mr-3.5 max-md:mr-2.5 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                    <div className="w-[64%] max-md:ml-0 max-md:w-full">
                        <Reason />
                    </div>
                </div>
            </div>
        </main>
    );
}
