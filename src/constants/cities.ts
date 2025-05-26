export const chile = [
  'Santiago,CL',
  'Valparaíso,CL',
  'Concepción,CL',
  'Antofagasta,CL',
  'Puerto Montt,CL',
  'La Serena,CL',
  'Iquique,CL',
  'Pucón,CL',
  'Valdivia,CL',
  'Arica,CL',
  'Temuco,CL',
  'Calama,CL'
];

export const continentalCities = {
  america: [
    'New York,US', 'Toronto,CA', 'Ciudad de México,MX', 
    'Chicago,US', 'Los Angeles,US', 'São Paulo,BR',
    'Rio de Janeiro,BR', 'Vancouver,CA', 'Bogotá,CO',
    'Medellín,CO', 'Quito,EC', 'Guayaquil,EC',
    'Panamá City,PA', 'San José,CR', 'San Juan,PR',
    'Cancún,MX', 'Dallas,US', 'Houston,US',
    'Boston,US', 'Miami,US'
  ],
  europe: [
    'London,UK', 'Paris,FR', 'Berlin,DE', 
    'Madrid,ES', 'Rome,IT', 'Amsterdam,NL',
    'Barcelona,ES', 'Vienna,AT', 'Prague,CZ',
    'Athens,GR', 'Lisbon,PT', 'Dublin,IE',
    'Brussels,BE', 'Edinburgh,UK', 'Milan,IT',
    'Munich,DE', 'Copenhagen,DK', 'Oslo,NO',
    'Stockholm,SE', 'Helsinki,FI'
  ],
  asia: [
    'Tokyo,JP', 'Shanghai,CN', 'Beijing,CN',
    'Seoul,KR', 'Delhi,IN', 'Mumbai,IN',
    'Bangkok,TH', 'Singapore,SG', 'Hong Kong,HK',
    'Dubai,AE', 'Osaka,JP', 'Jakarta,ID',
    'Kuala Lumpur,MY', 'Manila,PH', 'Taipei,TW',
    'Hanoi,VN', 'Ho Chi Minh City,VN', 'Riyadh,SA',
    'Jerusalem,IL', 'Doha,QA'
  ],
  africa_oceania: [
    'Cape Town,ZA', 'Cairo,EG', 'Nairobi,KE',
    'Sydney,AU', 'Melbourne,AU', 'Auckland,NZ',
    'Casablanca,MA', 'Lagos,NG', 'Johannesburg,ZA',
    'Addis Ababa,ET', 'Accra,GH', 'Dar es Salaam,TZ',
    'Perth,AU', 'Brisbane,AU', 'Wellington,NZ',
    'Tunis,TN', 'Algiers,DZ', 'Kinshasa,CD',
    'Abuja,NG', 'Dakar,SN'
  ]
};

// export const getLocalCities = (countryCode: string) => {
//   const localCitiesMap: Record<string, string[]> = {
//     'CL': [...chile.filter(c => c.endsWith(',CL'))],
//     'AR': ['Buenos Aires,AR', 'Córdoba,AR', 'Rosario,AR', /* +17 más */],
//     'MX': ['Ciudad de México,MX', 'Guadalajara,MX', 'Monterrey,MX', /* +17 más */],
//     // ... otros países
//     'default': chile.slice(0, 20)
//   };
//   return localCitiesMap[countryCode] || localCitiesMap['default'];
// };