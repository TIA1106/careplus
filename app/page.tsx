import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientHero from "@/components/ClientHero";
import HowItWorks from "@/components/HowItWorks";
import OnlineConsultation from "@/components/OnlineConsultation";
import FeatureSections from "@/components/FeatureSections";

export default function Home() {
  return (
    <div className="min-h-screen bg-black font-sans selection:bg-blue-900 selection:text-blue-100">
      <Navbar />
      <main>
        <ClientHero />
        <HowItWorks />
        <OnlineConsultation />
        <FeatureSections />
      </main>
      <Footer />
    </div>
  );
}
