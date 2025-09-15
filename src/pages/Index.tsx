import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { LocationSelector } from "@/components/LocationSelector";
import { EnergyDashboard } from "@/components/EnergyDashboard";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <LocationSelector onLocationSelect={setSelectedLocation} />
      {selectedLocation && <EnergyDashboard location={selectedLocation} />}
    </div>
  );
};

export default Index;