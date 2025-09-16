export interface City {
  name: string;
  country: string;
  fullName: string;
  climate: string;
  population: string;
  temperature: number;
  coordinates: {
    lat: number;
    lon: number;
  };
}

export interface CountryInfo {
  name: string;
  capital: string;
  population: number;
}

class CityService {
  private europeanCountries = [
    'Italy', 'France', 'Germany', 'Spain', 'Netherlands', 'Sweden', 'Denmark', 
    'Finland', 'Norway', 'Austria', 'Belgium', 'Switzerland', 'Poland', 
    'Czech Republic', 'Hungary', 'Portugal', 'Greece', 'Ireland', 'Croatia',
    'Slovenia', 'Slovakia', 'Estonia', 'Latvia', 'Lithuania', 'Luxembourg',
    'Malta', 'Cyprus', 'Bulgaria', 'Romania', 'United Kingdom'
  ];

  private majorEuropeanCities = [
    // Italy
    { name: 'Milano', country: 'Italy', lat: 45.4642, lon: 9.1900 },
    { name: 'Roma', country: 'Italy', lat: 41.9028, lon: 12.4964 },
    { name: 'Napoli', country: 'Italy', lat: 40.8518, lon: 14.2681 },
    { name: 'Torino', country: 'Italy', lat: 45.0703, lon: 7.6869 },
    { name: 'Bologna', country: 'Italy', lat: 44.4949, lon: 11.3426 },
    { name: 'Firenze', country: 'Italy', lat: 43.7696, lon: 11.2558 },
    { name: 'Venezia', country: 'Italy', lat: 45.4408, lon: 12.3155 },
    
    // France  
    { name: 'Parigi', country: 'France', lat: 48.8566, lon: 2.3522 },
    { name: 'Lione', country: 'France', lat: 45.7640, lon: 4.8357 },
    { name: 'Marsiglia', country: 'France', lat: 43.2965, lon: 5.3698 },
    { name: 'Toulouse', country: 'France', lat: 43.6047, lon: 1.4442 },
    { name: 'Nizza', country: 'France', lat: 43.7102, lon: 7.2620 },
    
    // Germany
    { name: 'Berlino', country: 'Germany', lat: 52.5200, lon: 13.4050 },
    { name: 'Monaco di Baviera', country: 'Germany', lat: 48.1351, lon: 11.5820 },
    { name: 'Amburgo', country: 'Germany', lat: 53.5511, lon: 9.9937 },
    { name: 'Colonia', country: 'Germany', lat: 50.9375, lon: 6.9603 },
    { name: 'Francoforte', country: 'Germany', lat: 50.1109, lon: 8.6821 },
    { name: 'Stoccarda', country: 'Germany', lat: 48.7758, lon: 9.1829 },
    { name: 'Düsseldorf', country: 'Germany', lat: 51.2277, lon: 6.7735 },
    
    // Spain
    { name: 'Madrid', country: 'Spain', lat: 40.4168, lon: -3.7038 },
    { name: 'Barcellona', country: 'Spain', lat: 41.3851, lon: 2.1734 },
    { name: 'Valencia', country: 'Spain', lat: 39.4699, lon: -0.3763 },
    { name: 'Siviglia', country: 'Spain', lat: 37.3891, lon: -5.9845 },
    { name: 'Bilbao', country: 'Spain', lat: 43.2627, lon: -2.9253 },
    
    // Netherlands
    { name: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lon: 4.9041 },
    { name: 'Rotterdam', country: 'Netherlands', lat: 51.9244, lon: 4.4777 },
    { name: 'L\'Aia', country: 'Netherlands', lat: 52.0705, lon: 4.3007 },
    { name: 'Utrecht', country: 'Netherlands', lat: 52.0907, lon: 5.1214 },
    
    // Nordic Countries
    { name: 'Stoccolma', country: 'Sweden', lat: 59.3293, lon: 18.0686 },
    { name: 'Göteborg', country: 'Sweden', lat: 57.7089, lon: 11.9746 },
    { name: 'Malmö', country: 'Sweden', lat: 55.6050, lon: 13.0038 },
    { name: 'Copenhagen', country: 'Denmark', lat: 55.6761, lon: 12.5683 },
    { name: 'Aarhus', country: 'Denmark', lat: 56.1629, lon: 10.2039 },
    { name: 'Helsinki', country: 'Finland', lat: 60.1695, lon: 24.9354 },
    { name: 'Tampere', country: 'Finland', lat: 61.4991, lon: 23.7871 },
    { name: 'Oslo', country: 'Norway', lat: 59.9139, lon: 10.7522 },
    { name: 'Bergen', country: 'Norway', lat: 60.3913, lon: 5.3221 },
    
    // UK
    { name: 'Londra', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
    { name: 'Manchester', country: 'United Kingdom', lat: 53.4808, lon: -2.2426 },
    { name: 'Birmingham', country: 'United Kingdom', lat: 52.4862, lon: -1.8904 },
    { name: 'Glasgow', country: 'United Kingdom', lat: 55.8642, lon: -4.2518 },
    { name: 'Edimburgo', country: 'United Kingdom', lat: 55.9533, lon: -3.1883 },
    
    // Other major cities
    { name: 'Vienna', country: 'Austria', lat: 48.2082, lon: 16.3738 },
    { name: 'Bruxelles', country: 'Belgium', lat: 50.8503, lon: 4.3517 },
    { name: 'Zurigo', country: 'Switzerland', lat: 47.3769, lon: 8.5417 },
    { name: 'Varsavia', country: 'Poland', lat: 52.2297, lon: 21.0122 },
    { name: 'Praga', country: 'Czech Republic', lat: 50.0755, lon: 14.4378 },
    { name: 'Budapest', country: 'Hungary', lat: 47.4979, lon: 19.0402 },
    { name: 'Lisbona', country: 'Portugal', lat: 38.7223, lon: -9.1393 },
    { name: 'Atene', country: 'Greece', lat: 37.9755, lon: 23.7348 },
    { name: 'Dublino', country: 'Ireland', lat: 53.3498, lon: -6.2603 }
  ];

  private getClimateType(temperature: number, country: string): string {
    // Determine climate based on average temperature and location
    if (temperature < 5) return 'Freddo';
    if (temperature < 12) return 'Temperato Freddo';
    if (temperature < 18) return 'Temperato';
    if (temperature < 22) return 'Temperato Caldo';
    return 'Mediterraneo';
  }

  private formatPopulation(population: number): string {
    if (population >= 1000000) {
      return `${(population / 1000000).toFixed(1)}M`;
    }
    if (population >= 1000) {
      return `${Math.round(population / 1000)}K`;
    }
    return population.toString();
  }

  async searchCities(query: string): Promise<City[]> {
    if (!query || query.length < 2) {
      return this.getPopularCities();
    }

    const filteredCities = this.majorEuropeanCities
      .filter(city => 
        city.name.toLowerCase().includes(query.toLowerCase()) ||
        city.country.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 20); // Limit results

    const citiesWithData = await Promise.all(
      filteredCities.map(city => this.getCityData(city.name, city.country, city.lat, city.lon))
    );

    return citiesWithData.filter(city => city !== null) as City[];
  }

  getPopularCities(): City[] {
    // Return some popular cities with mock data for immediate display
    return [
      {
        name: 'Milano',
        country: 'Italia',
        fullName: 'Milano, Italia',
        climate: 'Temperato',
        population: '1.4M',
        temperature: 14.5,
        coordinates: { lat: 45.4642, lon: 9.1900 }
      },
      {
        name: 'Stoccolma',
        country: 'Svezia',
        fullName: 'Stoccolma, Svezia',
        climate: 'Freddo',
        population: '975K',
        temperature: 7.2,
        coordinates: { lat: 59.3293, lon: 18.0686 }
      },
      {
        name: 'Amsterdam',
        country: 'Paesi Bassi',
        fullName: 'Amsterdam, Paesi Bassi',
        climate: 'Temperato',
        population: '873K',
        temperature: 10.8,
        coordinates: { lat: 52.3676, lon: 4.9041 }
      },
      {
        name: 'Berlino',
        country: 'Germania',
        fullName: 'Berlino, Germania',
        climate: 'Temperato',
        population: '3.7M',
        temperature: 9.6,
        coordinates: { lat: 52.5200, lon: 13.4050 }
      },
      {
        name: 'Parigi',
        country: 'Francia',
        fullName: 'Parigi, Francia',
        climate: 'Temperato',
        population: '2.2M',
        temperature: 12.0,
        coordinates: { lat: 48.8566, lon: 2.3522 }
      },
      {
        name: 'Copenhagen',
        country: 'Danimarca',
        fullName: 'Copenhagen, Danimarca',
        climate: 'Temperato Freddo',
        population: '630K',
        temperature: 8.7,
        coordinates: { lat: 55.6761, lon: 12.5683 }
      }
    ];
  }

  private async getCityData(name: string, country: string, lat: number, lon: number): Promise<City | null> {
    try {
      // For now, return mock data. In a real implementation, you would:
      // 1. Call OpenWeatherMap API for weather data
      // 2. Call population/demographics API for population data
      // 3. Process real climate data
      
      // Mock data based on coordinates and typical climate patterns
      const mockTemperature = this.getMockTemperature(lat, lon);
      const mockPopulation = this.getMockPopulation(name);
      
      return {
        name,
        country,
        fullName: `${name}, ${country}`,
        climate: this.getClimateType(mockTemperature, country),
        population: this.formatPopulation(mockPopulation),
        temperature: mockTemperature,
        coordinates: { lat, lon }
      };
    } catch (error) {
      console.error('Error fetching city data:', error);
      return null;
    }
  }

  private getMockTemperature(lat: number, lon: number): number {
    // Simple mock temperature based on latitude (higher latitude = colder)
    const baseTemp = 20 - (Math.abs(lat - 40) * 0.3);
    return Math.max(baseTemp + (Math.random() - 0.5) * 4, -10);
  }

  private getMockPopulation(cityName: string): number {
    // Mock population based on city name hash
    const hash = cityName.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const populations = [50000, 100000, 250000, 500000, 750000, 1000000, 1500000, 2000000, 3000000];
    return populations[Math.abs(hash) % populations.length];
  }
}

export const cityService = new CityService();
