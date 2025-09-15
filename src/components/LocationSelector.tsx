import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPin, Plus } from "lucide-react";

interface LocationSelectorProps {
  onLocationSelect: (location: string) => void;
}

const popularLocations = [
  { name: "Milano, Italia", climate: "Temperato", population: "1.4M" },
  { name: "Stoccolma, Svezia", climate: "Freddo", population: "975K" },
  { name: "Amsterdam, Paesi Bassi", climate: "Oceanico", population: "873K" },
  { name: "Francoforte, Germania", climate: "Temperato", population: "750K" },
  { name: "Helsinki, Finlandia", climate: "Freddo", population: "650K" },
  { name: "Copenhagen, Danimarca", climate: "Oceanico", population: "630K" },
];

export const LocationSelector = ({ onLocationSelect }: LocationSelectorProps) => {
  const [customLocation, setCustomLocation] = useState("");

  const handleLocationClick = (location: string) => {
    onLocationSelect(location);
  };

  const handleCustomLocation = () => {
    if (customLocation.trim()) {
      onLocationSelect(customLocation);
      setCustomLocation("");
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Seleziona la posizione del tuo data center
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scegli una città per analizzare le opportunità di riutilizzo energetico 
            specifiche per quella zona climatica e demografica.
          </p>
        </div>

        {/* Custom location input */}
        <Card className="max-w-md mx-auto mb-12 p-6 shadow-card">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="Inserisci città personalizzata..."
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                className="border-energy-sustainable/30 focus:border-energy-sustainable"
                onKeyPress={(e) => e.key === "Enter" && handleCustomLocation()}
              />
            </div>
            <Button 
              onClick={handleCustomLocation}
              className="bg-energy-sustainable hover:bg-energy-sustainable/90"
              size="icon"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Popular locations grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularLocations.map((location) => (
            <Card
              key={location.name}
              className="p-6 cursor-pointer hover:shadow-energy transition-all duration-300 hover:scale-105 border-2 hover:border-energy-sustainable/30"
              onClick={() => handleLocationClick(location.name)}
            >
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-energy-sustainable mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">
                    {location.name}
                  </h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Clima:</span>
                      <span className="text-foreground font-medium">{location.climate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Popolazione:</span>
                      <span className="text-foreground font-medium">{location.population}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-xs text-energy-sustainable font-medium">
                  Clicca per analizzare →
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};