import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPin, Plus, Search, Loader2 } from "lucide-react";
import { cityService, City } from "@/services/cityService";
import { useDebounce } from "@/hooks/useDebounce";

interface LocationSelectorProps {
  onLocationSelect: (location: string) => void;
}

export const LocationSelector = ({ onLocationSelect }: LocationSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 300);

  const handleLocationClick = (location: string) => {
    onLocationSelect(location);
  };

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const results = await cityService.searchCities(query);
      setCities(results);
    } catch (error) {
      console.error('Error searching cities:', error);
      setCities(cityService.getPopularCities());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load popular cities on mount
    setCities(cityService.getPopularCities());
  }, []);

  useEffect(() => {
    handleSearch(debouncedQuery);
  }, [debouncedQuery]);

  const displayedCities = useMemo(() => {
    return cities.slice(0, 12); // Limit to 12 cities for better UX
  }, [cities]);

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

        {/* Search input */}
        <Card className="max-w-md mx-auto mb-12 p-6 shadow-card">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca città europea..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-energy-sustainable/30 focus:border-energy-sustainable pl-10"
              />
              {isLoading && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
              )}
            </div>
          </div>
          {searchQuery && (
            <p className="text-xs text-muted-foreground mt-2">
              {cities.length} città trovate in Europa
            </p>
          )}
        </Card>

        {/* Cities grid */}
        {isLoading && cities.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-muted rounded mt-1" />
                  <div className="flex-1">
                    <div className="h-4 bg-muted rounded mb-2" />
                    <div className="space-y-1">
                      <div className="h-3 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCities.map((city) => (
              <Card
                key={`${city.name}-${city.country}`}
                className="p-6 cursor-pointer hover:shadow-energy transition-all duration-300 hover:scale-105 border-2 hover:border-energy-sustainable/30"
                onClick={() => handleLocationClick(city.fullName)}
              >
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-energy-sustainable mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">
                      {city.fullName}
                    </h3>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Clima:</span>
                        <span className="text-foreground font-medium">{city.climate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Popolazione:</span>
                        <span className="text-foreground font-medium">{city.population}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Temp. media:</span>
                        <span className="text-foreground font-medium">{city.temperature.toFixed(1)}°C</span>
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
        )}
        
        {!isLoading && cities.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Nessuna città trovata
            </h3>
            <p className="text-muted-foreground">
              Prova con un termine di ricerca diverso
            </p>
          </div>
        )}
      </div>
    </section>
  );
};