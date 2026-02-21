import { ServerAwareHeader } from "@/components/layout/ServerAwareHeader";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhyPsychologist } from "@/components/sections/WhyPsychologist";
import { PracticalInfo } from "@/components/sections/PracticalInfo";
import { Journey } from "@/components/sections/Journey";
import { InterventionAreas } from "@/components/sections/InterventionAreas";
import { Contact } from "@/components/sections/Contact";
import { SEO } from "@/components/shared/SEO";

export default function Home() {
    return (
        <>
            <SEO />
            <ServerAwareHeader />
            <main id="main-content">
                <Hero />
                <WhyPsychologist />
                <PracticalInfo />
                <Journey />
                <InterventionAreas />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
