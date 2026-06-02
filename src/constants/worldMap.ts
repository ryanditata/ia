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

export const countryCoordinates: Record<string, { latitude: number; longitude: number }> = {
  // A
  Afghanistan: { latitude: 33.9391, longitude: 67.7099 },
  Albania: { latitude: 41.1533, longitude: 20.1683 },
  Algeria: { latitude: 28.0339, longitude: 1.6596 },
  "American Samoa": { latitude: -14.2710, longitude: -170.1322 },
  Andorra: { latitude: 42.5063, longitude: 1.5218 },
  Angola: { latitude: -11.2027, longitude: 17.8739 },
  Anguilla: { latitude: 18.2206, longitude: -63.0686 },
  "Antigua and Barbuda": { latitude: 17.0608, longitude: -61.7964 },
  Argentina: { latitude: -38.4161, longitude: -63.6167 },
  Armenia: { latitude: 40.0691, longitude: 45.0382 },
  Aruba: { latitude: 12.5211, longitude: -69.9683 },
  Australia: { latitude: -25.2744, longitude: 133.7751 },
  Austria: { latitude: 47.5162, longitude: 14.5501 },
  Azerbaijan: { latitude: 40.1431, longitude: 47.5769 },

  // B
  Bahamas: { latitude: 25.0343, longitude: -77.3963 },
  Bahrain: { latitude: 25.9304, longitude: 50.6378 },
  Bangladesh: { latitude: 23.685, longitude: 90.3563 },
  Barbados: { latitude: 13.1939, longitude: -59.5432 },
  Belarus: { latitude: 53.7098, longitude: 27.9534 },
  Belgium: { latitude: 50.5039, longitude: 4.4699 },
  Belize: { latitude: 17.1899, longitude: -88.4976 },
  Benin: { latitude: 9.3077, longitude: 2.3158 },
  Bermuda: { latitude: 32.3078, longitude: -64.7505 },
  Bhutan: { latitude: 27.5142, longitude: 90.4336 },
  Bolivia: { latitude: -16.2902, longitude: -63.5887 },
  "Bosnia and Herzegovina": { latitude: 43.9159, longitude: 17.6791 },
  Botswana: { latitude: -22.3285, longitude: 24.6849 },
  Brazil: { latitude: -14.235, longitude: -51.9253 },
  Brunei: { latitude: 4.5353, longitude: 114.7277 },
  Bulgaria: { latitude: 42.7339, longitude: 25.4858 },
  "Burkina Faso": { latitude: 12.2383, longitude: -1.5616 },
  Burundi: { latitude: -3.3731, longitude: 29.9189 },

  // C
  "Cabo Verde": { latitude: 16.0021, longitude: -24.0132 },
  Cambodia: { latitude: 12.5657, longitude: 104.991 },
  Cameroon: { latitude: 7.3697, longitude: 12.3547 },
  Canada: { latitude: 56.1304, longitude: -106.3468 },
  "Cayman Islands": { latitude: 19.3133, longitude: -81.2546 },
  "Central African Republic": { latitude: 6.6111, longitude: 20.9394 },
  Chad: { latitude: 15.4542, longitude: 18.7322 },
  Chile: { latitude: -35.6751, longitude: -71.543 },
  China: { latitude: 35.8617, longitude: 104.1954 },
  Colombia: { latitude: 4.5709, longitude: -74.2973 },
  Comoros: { latitude: -11.875, longitude: 43.8722 },
  Congo: { latitude: -0.228, longitude: 15.8277 },
  "Congo (Democratic Republic of the)": { latitude: -4.0383, longitude: 21.7587 },
  "Cook Islands": { latitude: -21.2367, longitude: -159.7777 },
  "Costa Rica": { latitude: 9.7489, longitude: -83.7534 },
  Croatia: { latitude: 45.1, longitude: 15.2 },
  Cuba: { latitude: 21.5218, longitude: -77.7812 },
  Curaçao: { latitude: 12.1696, longitude: -68.9900 },
  Cyprus: { latitude: 35.1264, longitude: 33.4299 },
  Czechia: { latitude: 49.8175, longitude: 15.473 },

  // D
  Denmark: { latitude: 56.2639, longitude: 9.5018 },
  Djibouti: { latitude: 11.8251, longitude: 42.5903 },
  Dominica: { latitude: 15.415, longitude: -61.371 },
  "Dominican Republic": { latitude: 18.7357, longitude: -70.1627 },

  // E
  Ecuador: { latitude: -1.8312, longitude: -78.1834 },
  Egypt: { latitude: 26.8206, longitude: 30.8025 },
  "El Salvador": { latitude: 13.7942, longitude: -88.8965 },
  "Equatorial Guinea": { latitude: 1.6508, longitude: 10.2679 },
  Eritrea: { latitude: 15.1794, longitude: 39.7823 },
  Estonia: { latitude: 58.5953, longitude: 25.0136 },
  Eswatini: { latitude: -26.5225, longitude: 31.4659 },
  Ethiopia: { latitude: 9.145, longitude: 40.4897 },

  // F
  "Faroe Islands": { latitude: 61.8926, longitude: -6.9118 },
  Fiji: { latitude: -16.5782, longitude: 179.4144 },
  Finland: { latitude: 61.9241, longitude: 25.7482 },
  France: { latitude: 46.2276, longitude: 2.2137 },

  // G
  Gabon: { latitude: -0.8037, longitude: 11.6094 },
  Gambia: { latitude: 13.4432, longitude: -15.3101 },
  Georgia: { latitude: 42.3154, longitude: 43.3569 },
  Germany: { latitude: 51.1657, longitude: 10.4515 },
  Ghana: { latitude: 7.9465, longitude: -1.0232 },
  Gibraltar: { latitude: 36.1408, longitude: -5.3536 },
  Greece: { latitude: 39.0742, longitude: 21.8243 },
  Grenada: { latitude: 12.1165, longitude: -61.679 },
  Guadeloupe: { latitude: 16.2650, longitude: -61.5510 },
  Guatemala: { latitude: 15.7835, longitude: -90.2308 },
  Guernsey: { latitude: 49.4657, longitude: -2.5853 },
  Guinea: { latitude: 9.9456, longitude: -9.6966 },
  "Guinea-Bissau": { latitude: 11.8037, longitude: -15.1804 },
  Guyana: { latitude: 4.8604, longitude: -58.9302 },

  // H
  Haiti: { latitude: 18.9712, longitude: -72.2852 },
  Honduras: { latitude: 15.2, longitude: -86.2419 },
  "Hong Kong": { latitude: 22.3193, longitude: 114.1694 },
  Hungary: { latitude: 47.1625, longitude: 19.5033 },

  // I
  Iceland: { latitude: 64.9631, longitude: -19.0208 },
  India: { latitude: 20.5937, longitude: 78.9629 },
  Indonesia: { latitude: -0.7893, longitude: 113.9213 },
  Iran: { latitude: 32.4279, longitude: 53.688 },
  Iraq: { latitude: 33.2232, longitude: 43.6793 },
  Ireland: { latitude: 53.4129, longitude: -8.2439 },
  "Isle of Man": { latitude: 54.2361, longitude: -4.5481 },
  Israel: { latitude: 31.0461, longitude: 34.8516 },
  Italy: { latitude: 41.8719, longitude: 12.5674 },
  "Ivory Coast": { latitude: 7.54, longitude: -5.5471 },

  // J
  Jamaica: { latitude: 18.1096, longitude: -77.2975 },
  Japan: { latitude: 36.2048, longitude: 138.2529 },
  Jersey: { latitude: 49.2144, longitude: -2.1313 },
  Jordan: { latitude: 30.5852, longitude: 36.2384 },

  // K
  Kazakhstan: { latitude: 48.0196, longitude: 66.9237 },
  Kenya: { latitude: -0.0236, longitude: 37.9062 },
  Kiribati: { latitude: -3.3704, longitude: -168.734 },
  "North Korea": { latitude: 40.3399, longitude: 127.5101 },
  "South Korea": { latitude: 35.9078, longitude: 127.7669 },
  Kuwait: { latitude: 29.3117, longitude: 47.4818 },
  Kyrgyzstan: { latitude: 41.2044, longitude: 74.7661 },

  // L
  Laos: { latitude: 19.8563, longitude: 102.4955 },
  Latvia: { latitude: 56.8796, longitude: 24.6032 },
  Lebanon: { latitude: 33.8547, longitude: 35.8623 },
  Lesotho: { latitude: -29.61, longitude: 28.2336 },
  Liberia: { latitude: 6.4281, longitude: -9.4295 },
  Libya: { latitude: 26.3351, longitude: 17.2283 },
  Liechtenstein: { latitude: 47.166, longitude: 9.5554 },
  Lithuania: { latitude: 55.1694, longitude: 23.8813 },
  Luxembourg: { latitude: 49.8153, longitude: 6.1296 },

  // M
  Macao: { latitude: 22.1987, longitude: 113.5439 },
  Madagascar: { latitude: -18.7669, longitude: 46.8691 },
  Malawi: { latitude: -13.2543, longitude: 34.3015 },
  Malaysia: { latitude: 4.2105, longitude: 101.9758 },
  Maldives: { latitude: 3.2028, longitude: 73.2207 },
  Mali: { latitude: 17.5707, longitude: -3.9962 },
  Malta: { latitude: 35.9375, longitude: 14.3978 },
  "Marshall Islands": { latitude: 7.1315, longitude: 171.1845 },
  Martinique: { latitude: 14.6415, longitude: -61.0242 },
  Mauritania: { latitude: 21.0079, longitude: -10.9408 },
  Mauritius: { latitude: -20.3484, longitude: 57.5522 },
  Mayotte: { latitude: -12.8275, longitude: 45.1662 },
  Mexico: { latitude: 23.6345, longitude: -102.5528 },
  Micronesia: { latitude: 7.4256, longitude: 150.5508 },
  Moldova: { latitude: 47.4116, longitude: 28.3699 },
  Monaco: { latitude: 43.7384, longitude: 7.4246 },
  Mongolia: { latitude: 46.8625, longitude: 103.8467 },
  Montenegro: { latitude: 42.7087, longitude: 19.3744 },
  Montserrat: { latitude: 16.7425, longitude: -62.1874 },
  Morocco: { latitude: 31.7917, longitude: -7.0926 },
  Mozambique: { latitude: -18.6657, longitude: 35.5296 },
  Myanmar: { latitude: 21.9162, longitude: 95.956 },

  // N
  Namibia: { latitude: -22.9576, longitude: 18.4904 },
  Nauru: { latitude: -0.5228, longitude: 166.9315 },
  Nepal: { latitude: 28.3949, longitude: 84.124 },
  Netherlands: { latitude: 52.1326, longitude: 5.2913 },
  "New Zealand": { latitude: -40.9006, longitude: 174.886 },
  Nicaragua: { latitude: 12.8654, longitude: -85.2072 },
  Niger: { latitude: 17.6078, longitude: 8.0817 },
  Nigeria: { latitude: 9.082, longitude: 8.6753 },
  Niue: { latitude: -19.0544, longitude: -169.8672 },
  "Norfolk Island": { latitude: -29.0408, longitude: 167.9547 },
  "North Macedonia": { latitude: 41.6086, longitude: 21.7453 },
  Norway: { latitude: 60.472, longitude: 8.4689 },

  // O
  Oman: { latitude: 21.4735, longitude: 55.9754 },

  // P
  Pakistan: { latitude: 30.3753, longitude: 69.3451 },
  Palau: { latitude: 7.515, longitude: 134.5825 },
  Palestine: { latitude: 31.9522, longitude: 35.2332 },
  Panama: { latitude: 8.538, longitude: -80.7821 },
  "Papua New Guinea": { latitude: -6.315, longitude: 143.9555 },
  Paraguay: { latitude: -23.4425, longitude: -58.4438 },
  Peru: { latitude: -9.19, longitude: -75.0152 },
  Philippines: { latitude: 12.8797, longitude: 121.774 },
  "Pitcairn Islands": { latitude: -25.0660, longitude: -130.1002 },
  Poland: { latitude: 51.9194, longitude: 19.1451 },
  Portugal: { latitude: 39.3999, longitude: -8.2245 },
  "Puerto Rico": { latitude: 18.2208, longitude: -66.5901 },

  // Q
  Qatar: { latitude: 25.3548, longitude: 51.1839 },

  // R
  Réunion: { latitude: -21.1151, longitude: 55.5364 },
  Romania: { latitude: 45.9432, longitude: 24.9668 },
  Russia: { latitude: 61.524, longitude: 105.3188 },
  Rwanda: { latitude: -1.9403, longitude: 29.8739 },

  // S
  "Saint Barthélemy": { latitude: 17.9000, longitude: -62.8333 },
  "Saint Helena": { latitude: -15.9650, longitude: -5.7089 },
  "Saint Kitts and Nevis": { latitude: 17.3578, longitude: -62.783 },
  "Saint Lucia": { latitude: 13.9094, longitude: -60.9789 },
  "Saint Martin": { latitude: 18.0708, longitude: -63.0501 },
  "Saint Pierre and Miquelon": { latitude: 46.8852, longitude: -56.3159 },
  "Saint Vincent and the Grenadines": { latitude: 13.2528, longitude: -61.1971 },
  Samoa: { latitude: -13.759, longitude: -172.1046 },
  "San Marino": { latitude: 43.9424, longitude: 12.4578 },
  "Sao Tome and Principe": { latitude: 0.1864, longitude: 6.6131 },
  "Saudi Arabia": { latitude: 23.8859, longitude: 45.0792 },
  Senegal: { latitude: 14.4974, longitude: -14.4524 },
  Serbia: { latitude: 44.0165, longitude: 21.0059 },
  Seychelles: { latitude: -4.6796, longitude: 55.492 },
  "Sierra Leone": { latitude: 8.4606, longitude: -11.7799 },
  Singapore: { latitude: 1.3521, longitude: 103.8198 },
  "Sint Maarten": { latitude: 18.0425, longitude: -63.0548 },
  Slovakia: { latitude: 48.669, longitude: 19.699 },
  Slovenia: { latitude: 46.1512, longitude: 14.9955 },
  "Solomon Islands": { latitude: -9.6457, longitude: 160.1562 },
  Somalia: { latitude: 5.1521, longitude: 46.1996 },
  "South Africa": { latitude: -30.5595, longitude: 22.9375 },
  "South Sudan": { latitude: 6.877, longitude: 31.307 },
  Spain: { latitude: 40.4637, longitude: -3.7492 },
  "Sri Lanka": { latitude: 7.8731, longitude: 80.7718 },
  Sudan: { latitude: 12.8628, longitude: 30.2176 },
  Suriname: { latitude: 3.9193, longitude: -56.0278 },
  Sweden: { latitude: 60.1282, longitude: 18.6435 },
  Switzerland: { latitude: 46.8182, longitude: 8.2275 },
  Syria: { latitude: 34.8021, longitude: 38.9968 },

  // T
  Taiwan: { latitude: 23.6978, longitude: 120.9605 },
  Tajikistan: { latitude: 38.861, longitude: 71.2761 },
  Tanzania: { latitude: -6.369, longitude: 34.8888 },
  Thailand: { latitude: 15.87, longitude: 100.9925 },
  "Timor-Leste": { latitude: -8.8742, longitude: 125.7275 },
  Togo: { latitude: 8.6195, longitude: 0.8248 },
  Tokelau: { latitude: -9.2002, longitude: -171.8484 },
  Tonga: { latitude: -21.179, longitude: -175.1982 },
  "Trinidad and Tobago": { latitude: 10.6918, longitude: -61.2225 },
  Tunisia: { latitude: 33.8869, longitude: 9.5375 },
  Turkey: { latitude: 38.9637, longitude: 35.2433 },
  Turkmenistan: { latitude: 38.9697, longitude: 59.5563 },
  "Turks and Caicos Islands": { latitude: 21.6940, longitude: -71.7979 },
  Tuvalu: { latitude: -7.1095, longitude: 177.6493 },

  // U
  Uganda: { latitude: 1.3733, longitude: 32.2903 },
  Ukraine: { latitude: 48.3794, longitude: 31.1656 },
  "United Arab Emirates": { latitude: 23.4241, longitude: 53.8478 },
  "United Kingdom": { latitude: 55.3781, longitude: -3.436 },
  "United States": { latitude: 37.0902, longitude: -95.7129 },
  Uruguay: { latitude: -32.5228, longitude: -55.7658 },
  Uzbekistan: { latitude: 41.3775, longitude: 64.5853 },

  // V
  Vanuatu: { latitude: -15.3767, longitude: 166.9592 },
  "Vatican City": { latitude: 41.9029, longitude: 12.4534 },
  Venezuela: { latitude: 6.4238, longitude: -66.5897 },
  Vietnam: { latitude: 14.0583, longitude: 108.2772 },

  // W
  "Wallis and Futuna": { latitude: -13.7688, longitude: -177.1561 },
  "Western Sahara": { latitude: 24.2155, longitude: -12.8858 },

  // Y
  Yemen: { latitude: 15.5527, longitude: 48.5164 },

  // Z
  Zambia: { latitude: -13.1339, longitude: 27.8493 },
  Zimbabwe: { latitude: -19.0154, longitude: 29.1549 },
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