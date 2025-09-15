import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-energy opacity-10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-energy-sustainable/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-60 right-32 w-24 h-24 bg-energy-cool/20 rounded-full blur-lg animate-pulse delay-300" />
        <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-energy-heat/20 rounded-full blur-2xl animate-pulse delay-700" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border shadow-sm mb-8">
            <div className="w-2 h-2 bg-energy-sustainable rounded-full animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              Innovazione Sostenibile per Data Center
            </span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
          Riutilizza l'energia
          <br />
          <span className="bg-gradient-energy bg-clip-text text-transparent">
            dei tuoi data center
          </span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Scopri come ottimizzare il riutilizzo di calore e acqua dei data center 
          in base alla posizione geografica. Massimizza l'efficienza energetica 
          e riduci l'impatto ambientale.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-energy text-white hover:shadow-glow transition-all duration-300 px-8 py-6 text-lg font-semibold"
          >
            Inizia l'Analisi
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-energy-sustainable text-energy-sustainable hover:bg-energy-sustainable hover:text-white transition-all duration-300 px-8 py-6 text-lg"
          >
            Scopri di più
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-energy-sustainable mb-2">85%</div>
            <div className="text-sm text-muted-foreground">Efficienza Energetica</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-energy-heat mb-2">70°C</div>
            <div className="text-sm text-muted-foreground">Calore Recuperabile</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-energy-cool mb-2">40%</div>
            <div className="text-sm text-muted-foreground">Riduzione CO₂</div>
          </div>
        </div>
      </div>
    </section>
  );
};