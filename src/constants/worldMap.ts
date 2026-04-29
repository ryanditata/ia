// Koordinat pusat benua
const continentCoords: Record<string, { latitude: number; longitude: number }> =
  {
    Asia: { latitude: 34.0479, longitude: 100.6197 },
    Europe: { latitude: 54.526, longitude: 15.2551 },
    Africa: { latitude: 8.7832, longitude: 34.5085 },
    "North America": { latitude: 54.526, longitude: -105.2551 },
    "South America": { latitude: -8.7832, longitude: -55.4915 },
    Oceania: { latitude: -22.7359, longitude: 140.0188 },
    Antarctica: { latitude: -82.8628, longitude: 135.0 },
  };

// Mapping lengkap negara ke benua
export const countryToContinent: Record<string, string> = {
  Afghanistan: "Asia",
  Albania: "Europe",
  Algeria: "Africa",
  "American Samoa": "Oceania",
  Andorra: "Europe",
  Angola: "Africa",
  Anguilla: "North America",
  Antarctica: "Antarctica",
  "Antigua and Barbuda": "North America",
  Argentina: "South America",
  Armenia: "Asia",
  Aruba: "North America",
  Australia: "Oceania",
  Austria: "Europe",
  Azerbaijan: "Asia",
  Bahamas: "North America",
  Bahrain: "Asia",
  Bangladesh: "Asia",
  Barbados: "North America",
  Belarus: "Europe",
  Belgium: "Europe",
  Belize: "North America",
  Benin: "Africa",
  Bermuda: "North America",
  Bhutan: "Asia",
  Bolivia: "South America",
  "Bosnia and Herzegovina": "Europe",
  Botswana: "Africa",
  Brazil: "South America",
  Brunei: "Asia",
  Bulgaria: "Europe",
  "Burkina Faso": "Africa",
  Burundi: "Africa",
  "Cabo Verde": "Africa",
  Cambodia: "Asia",
  Cameroon: "Africa",
  Canada: "North America",
  "Cayman Islands": "North America",
  "Central African Republic": "Africa",
  Chad: "Africa",
  Chile: "South America",
  China: "Asia",
  "Christmas Island": "Oceania",
  "Cocos (Keeling) Islands": "Oceania",
  Colombia: "South America",
  Comoros: "Africa",
  Congo: "Africa",
  "Congo (Democratic Republic of the)": "Africa",
  "Cook Islands": "Oceania",
  "Costa Rica": "North America",
  Croatia: "Europe",
  Cuba: "North America",
  Curaçao: "North America",
  Cyprus: "Asia",
  Czechia: "Europe",
  Denmark: "Europe",
  Djibouti: "Africa",
  Dominica: "North America",
  "Dominican Republic": "North America",
  Ecuador: "South America",
  Egypt: "Africa",
  "El Salvador": "North America",
  "Equatorial Guinea": "Africa",
  Eritrea: "Africa",
  Estonia: "Europe",
  Eswatini: "Africa",
  Ethiopia: "Africa",
  "Falkland Islands": "South America",
  "Faroe Islands": "Europe",
  Fiji: "Oceania",
  Finland: "Europe",
  France: "Europe",
  "French Guiana": "South America",
  "French Polynesia": "Oceania",
  Gabon: "Africa",
  Gambia: "Africa",
  Georgia: "Asia",
  Germany: "Europe",
  Ghana: "Africa",
  Gibraltar: "Europe",
  Greece: "Europe",
  Greenland: "North America",
  Grenada: "North America",
  Guadeloupe: "North America",
  Guam: "Oceania",
  Guatemala: "North America",
  Guernsey: "Europe",
  Guinea: "Africa",
  "Guinea-Bissau": "Africa",
  Guyana: "South America",
  Haiti: "North America",
  Honduras: "North America",
  "Hong Kong": "Asia",
  Hungary: "Europe",
  Iceland: "Europe",
  India: "Asia",
  Indonesia: "Asia",
  Iran: "Asia",
  Iraq: "Asia",
  Ireland: "Europe",
  "Isle of Man": "Europe",
  Israel: "Asia",
  Italy: "Europe",
  "Ivory Coast": "Africa",
  Jamaica: "North America",
  Japan: "Asia",
  Jersey: "Europe",
  Jordan: "Asia",
  Kazakhstan: "Asia",
  Kenya: "Africa",
  Kiribati: "Oceania",
  Korea: "Asia",
  Kuwait: "Asia",
  Kyrgyzstan: "Asia",
  Laos: "Asia",
  Latvia: "Europe",
  Lebanon: "Asia",
  Lesotho: "Africa",
  Liberia: "Africa",
  Libya: "Africa",
  Liechtenstein: "Europe",
  Lithuania: "Europe",
  Luxembourg: "Europe",
  Macao: "Asia",
  Madagascar: "Africa",
  Malawi: "Africa",
  Malaysia: "Asia",
  Maldives: "Asia",
  Mali: "Africa",
  Malta: "Europe",
  "Marshall Islands": "Oceania",
  Martinique: "North America",
  Mauritania: "Africa",
  Mauritius: "Africa",
  Mayotte: "Africa",
  Mexico: "North America",
  Micronesia: "Oceania",
  Moldova: "Europe",
  Monaco: "Europe",
  Mongolia: "Asia",
  Montenegro: "Europe",
  Montserrat: "North America",
  Morocco: "Africa",
  Mozambique: "Africa",
  Myanmar: "Asia",
  Namibia: "Africa",
  Nauru: "Oceania",
  Nepal: "Asia",
  Netherlands: "Europe",
  "New Caledonia": "Oceania",
  "New Zealand": "Oceania",
  Nicaragua: "North America",
  Niger: "Africa",
  Nigeria: "Africa",
  Niue: "Oceania",
  "Norfolk Island": "Oceania",
  "North Macedonia": "Europe",
  Norway: "Europe",
  Oman: "Asia",
  Pakistan: "Asia",
  Palau: "Oceania",
  Palestine: "Asia",
  Panama: "North America",
  "Papua New Guinea": "Oceania",
  Paraguay: "South America",
  Peru: "South America",
  Philippines: "Asia",
  "Pitcairn Islands": "Oceania",
  Poland: "Europe",
  Portugal: "Europe",
  "Puerto Rico": "North America",
  Qatar: "Asia",
  Réunion: "Africa",
  Romania: "Europe",
  Russia: "Europe",
  Rwanda: "Africa",
  "Saint Barthélemy": "North America",
  "Saint Helena": "Africa",
  "Saint Kitts and Nevis": "North America",
  "Saint Lucia": "North America",
  "Saint Martin": "North America",
  "Saint Pierre and Miquelon": "North America",
  "Saint Vincent and the Grenadines": "North America",
  Samoa: "Oceania",
  "San Marino": "Europe",
  "Sao Tome and Principe": "Africa",
  "Saudi Arabia": "Asia",
  Senegal: "Africa",
  Serbia: "Europe",
  Seychelles: "Africa",
  "Sierra Leone": "Africa",
  Singapore: "Asia",
  "Sint Maarten": "North America",
  Slovakia: "Europe",
  Slovenia: "Europe",
  "Solomon Islands": "Oceania",
  Somalia: "Africa",
  "South Africa": "Africa",
  "South Georgia and the South Sandwich Islands": "Antarctica",
  "South Sudan": "Africa",
  Spain: "Europe",
  "Sri Lanka": "Asia",
  Sudan: "Africa",
  Suriname: "South America",
  Sweden: "Europe",
  Switzerland: "Europe",
  Syria: "Asia",
  Taiwan: "Asia",
  Tajikistan: "Asia",
  Tanzania: "Africa",
  Thailand: "Asia",
  "Timor-Leste": "Asia",
  Togo: "Africa",
  Tokelau: "Oceania",
  Tonga: "Oceania",
  "Trinidad and Tobago": "North America",
  Tunisia: "Africa",
  Turkey: "Asia",
  Turkmenistan: "Asia",
  "Turks and Caicos Islands": "North America",
  Tuvalu: "Oceania",
  Uganda: "Africa",
  Ukraine: "Europe",
  "United Arab Emirates": "Asia",
  "United Kingdom": "Europe",
  "United States": "North America",
  Uruguay: "South America",
  Uzbekistan: "Asia",
  Vanuatu: "Oceania",
  "Vatican City": "Europe",
  Venezuela: "South America",
  Vietnam: "Asia",
  "Wallis and Futuna": "Oceania",
  "Western Sahara": "Africa",
  Yemen: "Asia",
  Zambia: "Africa",
  Zimbabwe: "Africa",
};

// Fungsi generate cooperationMap
export function generateCooperationMap(
  rawData: Record<string, { mou: number; moa: number; ia: number }>,
) {
  const aggregated: Record<string, number> = {};

  for (const [country, values] of Object.entries(rawData)) {
    const continent = countryToContinent[country];
    if (!continent) continue;
    const total = values.mou + values.moa + values.ia;
    aggregated[continent] = (aggregated[continent] || 0) + total;
  }

  return Object.entries(aggregated).map(([continent, total]) => ({
    title: continent,
    latitude: continentCoords[continent].latitude,
    longitude: continentCoords[continent].longitude,
    value: total,
  }));
}

const countryCoordinates: Record<string, { latitude: number; longitude: number }> = {
  China: { latitude: 35.8617, longitude: 104.1954 },
  "Hong Kong": { latitude: 22.3193, longitude: 114.1694 },
  India: { latitude: 20.5937, longitude: 78.9629 },
  Indonesia: { latitude: -0.7893, longitude: 113.9213 },
  Japan: { latitude: 36.2048, longitude: 138.2529 },
  Malaysia: { latitude: 4.2105, longitude: 101.9758 },
  Philippines: { latitude: 12.8797, longitude: 121.7740 },
  Singapore: { latitude: 1.3521, longitude: 103.8198 },
  "South Korea": { latitude: 35.9078, longitude: 127.7669 },
  Taiwan: { latitude: 23.6978, longitude: 120.9605 },
  Thailand: { latitude: 15.8700, longitude: 100.9925 },
  "Timor-Leste": { latitude: -8.8742, longitude: 125.7275 },
  Vietnam: { latitude: 14.0583, longitude: 108.2772 },

  "Bosnia And Herzegovina": { latitude: 43.9159, longitude: 17.6791 },
  Croatia: { latitude: 45.1000, longitude: 15.2000 },
  Germany: { latitude: 51.1657, longitude: 10.4515 },
  Greece: { latitude: 39.0742, longitude: 21.8243 },
  Malta: { latitude: 35.9375, longitude: 14.3978 },
  Netherlands: { latitude: 52.1326, longitude: 5.2913 },
  Norway: { latitude: 60.4720, longitude: 8.4689 },
  Poland: { latitude: 51.9194, longitude: 19.1451 },
  Turkey: { latitude: 38.9637, longitude: 35.2433 },
  "United Kingdom": { latitude: 55.3781, longitude: -3.4360 },

  "United States": { latitude: 37.0902, longitude: -95.7129 },
};

export function generateCooperationMapByCountry(
  rawData: Record<string, { mou: number; moa: number; ia: number }>
) {
  const mapPoints: Array<{ 
    title: string; 
    latitude: number; 
    longitude: number; 
    value: number;
    mou: number; 
    moa: number; 
    ia: number; 
  }> = [];
  
  const normalizedCoords: Record<string, { latitude: number; longitude: number }> = {};
  for (const [key, value] of Object.entries(countryCoordinates)) {
    normalizedCoords[key.trim().toLowerCase()] = value;
  }

  for (const [countryName, values] of Object.entries(rawData)) {
    const cleanCountryName = countryName.trim().toLowerCase();
    if (cleanCountryName === "total") continue;

    const coords = normalizedCoords[cleanCountryName];
    
    if (coords) {
      const total = values.mou + values.moa + values.ia;
      
      if (total > 0) {
        const titleCaseName = countryName
          .trim()
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        mapPoints.push({
          title: titleCaseName,
          latitude: coords.latitude,
          longitude: coords.longitude,
          value: total,
          mou: values.mou,
          moa: values.moa, 
          ia: values.ia,  
        });
      }
    } else {
      console.warn(`Koordinat untuk negara "${countryName}" belum tersedia.`);
    }
  }

  return mapPoints;
}