import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Thermometer, 
  Droplets, 
  Home, 
  Leaf, 
  Building, 
  Waves,
  Factory,
  Sun
} from "lucide-react";

interface EnergyDashboardProps {
  location: string;
}

const reuseOptions = [
  {
    id: "district-heating",
    title: "Teleriscaldamento Urbano",
    description: "Riscaldamento di edifici residenziali e commerciali tramite rete di distribuzione",
    icon: Home,
    efficiency: 92,
    potential: "Alto",
    co2Reduction: 45,
    energySaved: "2,400 MWh/anno",
    color: "energy-heat"
  },
  {
    id: "greenhouse",
    title: "Riscaldamento Serre",
    description: "Supporto alla coltivazione in ambiente controllato per tutto l'anno",
    icon: Leaf,
    efficiency: 88,
    potential: "Alto",
    co2Reduction: 35,
    energySaved: "1,800 MWh/anno",
    color: "energy-sustainable"
  },
  {
    id: "swimming-pools",
    title: "Piscine e Stabilimenti Termali",
    description: "Mantenimento temperature ottimali per strutture ricreative e terapeutiche",
    icon: Waves,
    efficiency: 85,
    potential: "Medio",
    co2Reduction: 25,
    energySaved: "1,200 MWh/anno",
    color: "energy-cool"
  },
  {
    id: "industrial",
    title: "Processi Industriali",
    description: "Integrazione in processi produttivi che richiedono calore a bassa temperatura",
    icon: Factory,
    efficiency: 78,
    potential: "Medio",
    co2Reduction: 30,
    energySaved: "1,500 MWh/anno",
    color: "energy-neutral"
  },
  {
    id: "water-heating",
    title: "Acqua Calda Sanitaria",
    description: "Produzione di acqua calda per usi domestici e commerciali",
    icon: Droplets,
    efficiency: 90,
    potential: "Alto",
    co2Reduction: 40,
    energySaved: "2,000 MWh/anno",
    color: "accent"
  },
  {
    id: "desalination",
    title: "Dissalazione Termica",
    description: "Produzione di acqua dolce tramite processi di dissalazione ad energia termica",
    icon: Sun,
    efficiency: 75,
    potential: "Basso",
    co2Reduction: 20,
    energySaved: "900 MWh/anno",
    color: "secondary"
  }
];

export const EnergyDashboard = ({ location }: EnergyDashboardProps) => {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm mb-4">
            <Thermometer className="h-4 w-4 text-energy-heat" />
            <span className="text-sm font-medium">Analisi per {location}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Opportunità di Riutilizzo Energetico
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ecco le principali opportunità per riutilizzare il calore di scarto del tuo data center
            in base alle caratteristiche climatiche e infrastrutturali di {location}.
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-energy-sustainable mb-1">85%</div>
            <div className="text-sm text-muted-foreground">Efficienza Media</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-energy-heat mb-1">9.8</div>
            <div className="text-sm text-muted-foreground">GWh/anno Totali</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-energy-cool mb-1">195t</div>
            <div className="text-sm text-muted-foreground">CO₂ Evitate</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-accent mb-1">€2.1M</div>
            <div className="text-sm text-muted-foreground">Risparmio Annuo</div>
          </Card>
        </div>

        {/* Reuse options grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reuseOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Card 
                key={option.id} 
                className="p-6 hover:shadow-energy transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-lg bg-${option.color}/10`}>
                    <IconComponent className={`h-6 w-6 text-${option.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {option.title}
                    </h3>
                    <Badge 
                      variant={option.potential === "Alto" ? "default" : option.potential === "Medio" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      Potenziale {option.potential}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {option.description}
                </p>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Efficienza</span>
                      <span className="font-medium">{option.efficiency}%</span>
                    </div>
                    <Progress value={option.efficiency} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">CO₂ Ridotta</div>
                      <div className="font-semibold text-energy-sustainable">{option.co2Reduction}t/anno</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Energia</div>
                      <div className="font-semibold text-energy-heat">{option.energySaved}</div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-energy/5">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Pronto per ottimizzare il tuo data center?
            </h3>
            <p className="text-muted-foreground mb-6">
              Contatta i nostri esperti per una consulenza personalizzata 
              sulle migliori strategie di riutilizzo energetico per {location}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-energy text-white rounded-lg font-medium hover:shadow-glow transition-all duration-300">
                Richiedi Consulenza
              </button>
              <button className="px-6 py-3 border border-energy-sustainable text-energy-sustainable rounded-lg font-medium hover:bg-energy-sustainable hover:text-white transition-all duration-300">
                Scarica Report PDF
              </button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};