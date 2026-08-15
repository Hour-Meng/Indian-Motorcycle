export interface MotorcycleModel {
  id: string;
  category: 'SCOUT BOBBER' | 'CRUISER' | 'BAGGER' | 'TOURING' | 'ELITE' | '125TH ANNIV.';
  name: string;
  subtitle: string;
  bgTitle: string;
  bgSubtitle: string;
  price: string;
  priceNum: number;
  engine: string;
  displacement: string;
  horsepower: string;
  torque: string;
  weight: string;
  seatHeight: string;
  fuelCapacity: string;
  description: string;
  features: string[];
  colors: {
    name: string;
    hex: string;
    accentHex?: string;
    imageUrl: string;
  }[];
  angles?: string[];
}

export const MOTORCYCLE_LINEUP: MotorcycleModel[] = [
  {
    id: 'scout-bobber-2025',
    category: 'SCOUT BOBBER',
    name: 'Scout Bobber',
    subtitle: 'ICONIC AGGRESSIVE STRIPPED-DOWN BOBBER',
    bgTitle: 'SCOUT BOBBER',
    bgSubtitle: 'ALL-NEW SPEEDPLUS 1250CC ENGINE',
    price: '$12,999',
    priceNum: 12999,
    engine: 'Liquid-Cooled SpeedPlus 1250cc V-Twin',
    displacement: '1250 cc (76.3 cu in)',
    horsepower: '105 HP',
    torque: '82 ft-lbs @ 6300 RPM',
    weight: '522 lbs (237 kg)',
    seatHeight: '25.6 in (649 mm)',
    fuelCapacity: '3.4 gal (13 L)',
    description: 'Low-slung, blacked-out with a mean stance. The Indian Scout Bobber blends iconic American heritage with raw, modern muscle, chopped bobber fenders, and bar-end mirrors.',
    features: [
      'Aggressive Chopped Bobber Fenders',
      'Side-Mounted License Plate & Bar-End Mirrors',
      'Slammed 2-inch Suspension Stance',
      'Blacked-Out Dual Exhaust System',
      'Available ABS & Traction Control with Ride Modes'
    ],
    colors: [
      {
        name: 'Black Metallic',
        hex: '#111111',
        imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Silver Quartz Smoke',
        hex: '#7e8387',
        imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Sunset Red Smoke',
        hex: '#78191f',
        imageUrl: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Ghost White Metallic',
        hex: '#e2e5e8',
        imageUrl: 'https://images.unsplash.com/photo-1558981420-87aa9dad1c89?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    id: 'scout-bobber-twenty',
    category: 'SCOUT BOBBER',
    name: 'Scout Bobber Twenty',
    subtitle: 'OLD-SCHOOL BOBBER ATTITUDE & APE HANGERS',
    bgTitle: 'SCOUT TWENTY',
    bgSubtitle: 'SPOKED WHEELS & HERITAGE DETAIL',
    price: '$13,699',
    priceNum: 13699,
    engine: 'Liquid-Cooled 1250cc SpeedPlus V-Twin',
    displacement: '1250 cc (76.3 cu in)',
    horsepower: '105 HP',
    torque: '82 ft-lbs @ 6300 RPM',
    weight: '530 lbs (240 kg)',
    seatHeight: '27.4 in (695 mm)',
    fuelCapacity: '3.4 gal (13 L)',
    description: 'A nod to the original 1920 Scout. Loaded with heritage styling, wire-spoke wheels, floating solo saddle, and 10-inch mini-ape handlebars for an imposing upright riding posture.',
    features: [
      'Blacked-Out Wire Spoked Wheels',
      '10-inch Mini-Ape Hanger Handlebars',
      'Floating Leather Bobber Solo Seat',
      'Vintage-Inspired Indian Tank Badge',
      'Chopped Rear Fender with LED Halo Tail'
    ],
    colors: [
      {
        name: 'Stealth Gray',
        hex: '#3f4448',
        imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Indian Motorcycle Red',
        hex: '#861219',
        imageUrl: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Black Smoke',
        hex: '#1c1c1c',
        imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    id: 'scout-101',
    category: 'SCOUT BOBBER',
    name: '101 Scout',
    subtitle: 'THE HIGHEST PERFORMANCE SCOUT EVER BUILT',
    bgTitle: '101 SCOUT',
    bgSubtitle: '111 HORSEPOWER & BREMBO BRAKES',
    price: '$16,999',
    priceNum: 16999,
    engine: 'SpeedPlus 1250cc High-Output V-Twin',
    displacement: '1250 cc (76.3 cu in)',
    horsepower: '111 HP',
    torque: '82 ft-lbs @ 6300 RPM',
    weight: '517 lbs (235 kg)',
    seatHeight: '25.7 in (654 mm)',
    fuelCapacity: '3.4 gal (13 L)',
    description: 'Engineered as the pinnacle of American performance cruisers. Features fully adjustable inverted front forks, piggyback rear shocks, dual Brembo brakes, and exclusive 101 custom badging.',
    features: [
      'Inverted Front Forks & Piggyback Rear Shocks',
      'Dual Disc Brembo® 4-Piston Radial Calipers',
      'Custom Moto-Style Handlebars & 6-inch Risers',
      '4-inch Touchscreen Display Powered by RIDE COMMAND',
      '3 Selectable Ride Modes: Sport, Standard, Tour'
    ],
    colors: [
      {
        name: 'Sunset Red Metallic with 101 Graphics',
        hex: '#78191f',
        imageUrl: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Ghost White Metallic with Graphics',
        hex: '#e2e5e8',
        imageUrl: 'https://images.unsplash.com/photo-1558981420-87aa9dad1c89?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    id: 'chief-vintage-125',
    category: '125TH ANNIV.',
    name: 'Chief Vintage 125th',
    subtitle: '125TH ANNIVERSARY LIMITED COLLECTOR EDITION',
    bgTitle: 'CHIEF VINTAGE',
    bgSubtitle: '125TH ANNIVERSARY EDITION',
    price: '$21,499',
    priceNum: 21499,
    engine: 'Thunderstroke 116 Air-Cooled V-Twin',
    displacement: '1890 cc (116 cu in)',
    horsepower: '92 HP',
    torque: '120 ft-lbs @ 2900 RPM',
    weight: '670 lbs (304 kg)',
    seatHeight: '26.0 in (660 mm)',
    fuelCapacity: '4.0 gal (15.1 L)',
    description: 'Celebrating 125 years of American motorcycling heritage. Features authentic deep anniversary crimson red paint, valanced fenders, chrome finishes, and numbered commemorative badge.',
    features: [
      'Exclusive 125th Anniversary Crimson & Gold Paint',
      'Thunderstroke 116 Engine with 120 ft-lbs Torque',
      'Valanced Heritage Fenders with Lighted Headdress',
      'Wire Wheels with White-Wall Ready Styling',
      'Numbered Tank Console Plaque (1 of 125)'
    ],
    colors: [
      {
        name: '125th Anniversary Crimson & Gold',
        hex: '#691218',
        imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    id: 'scout-sixty-bobber',
    category: 'SCOUT BOBBER',
    name: 'Scout Sixty Bobber',
    subtitle: 'ACCESSIBLE ENTRY TO AUTHENTIC BOBBER ATTITUDE',
    bgTitle: 'SCOUT SIXTY',
    bgSubtitle: '999CC LIQUID-COOLED V-TWIN',
    price: '$10,749',
    priceNum: 10749,
    engine: 'Liquid-Cooled 999cc V-Twin',
    displacement: '999 cc (60 cu in)',
    horsepower: '78 HP',
    torque: '65 ft-lbs @ 5800 RPM',
    weight: '516 lbs (234 kg)',
    seatHeight: '25.6 in (649 mm)',
    fuelCapacity: '3.4 gal (13 L)',
    description: 'Lightweight agility meets raw stripped-down bobber styling. The Scout Sixty Bobber delivers responsive power, low seat height, and accessible customizability.',
    features: [
      'Accessible 999cc Liquid-Cooled V-Twin',
      'Ultra-Low 25.6 in Seat Height',
      '5-Speed Constant Mesh Transmission',
      'Stripped Bobber Fenders & Solo Seat',
      'Fully Blacked-Out Engine Finish'
    ],
    colors: [
      {
        name: 'Black Metallic',
        hex: '#151515',
        imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Ruby Smoke',
        hex: '#5c1016',
        imageUrl: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  {
    id: 'sport-scout',
    category: 'CRUISER',
    name: 'Sport Scout',
    subtitle: 'AGGRESSIVE CLUB-STYLE PERFORMANCE CRUISER',
    bgTitle: 'SPORT SCOUT',
    bgSubtitle: 'QUARTER FAIRING & MOTO BARS',
    price: '$13,499',
    priceNum: 13499,
    engine: 'SpeedPlus 1250cc V-Twin',
    displacement: '1250 cc (76.3 cu in)',
    horsepower: '105 HP',
    torque: '82 ft-lbs @ 6300 RPM',
    weight: '526 lbs (239 kg)',
    seatHeight: '25.7 in (654 mm)',
    fuelCapacity: '3.4 gal (13 L)',
    description: 'Modern West-Coast style performance cruiser with sleek quarter fairing, moto handlebars with 6-inch risers, and sport-style seat for spirited corner carving.',
    features: [
      'Aerodynamic Color-Matched Quarter Fairing',
      'Moto Style Handlebars with 6-inch Risers',
      'Sport Comfort Solo Seat with Bolster',
      '19-inch Front Sport Wheel',
      'High Output SpeedPlus 1250cc Engine'
    ],
    colors: [
      {
        name: 'Black Smoke',
        hex: '#1f1f1f',
        imageUrl: 'https://images.unsplash.com/photo-1558981420-87aa9dad1c89?auto=format&fit=crop&w=1200&q=80'
      },
      {
        name: 'Storm Blue',
        hex: '#23384f',
        imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  }
];

export const ACCESSORIES_LIST = [
  { id: 'acc-exhaust', name: 'Stage 1 2-into-1 Full Exhaust System', category: 'Performance', price: 1099, image: '🔥' },
  { id: 'acc-seat', name: 'Syndicate 2-Up Genuine Leather Seat', category: 'Comfort', price: 449, image: '💺' },
  { id: 'acc-bars', name: '10-inch Mini Ape-Hanger Handlebars', category: 'Style', price: 299, image: '🏍️' },
  { id: 'acc-bags', name: 'Quick-Release Weatherproof Bobber Saddlebags', category: 'Touring', price: 699, image: '💼' },
  { id: 'acc-fairing', name: 'Quarter Fairing with Smoked Windshield', category: 'Style', price: 379, image: '🛡️' },
  { id: 'acc-ridecommand', name: '4-inch Round Touchscreen with RIDE COMMAND', category: 'Tech', price: 899, image: '📱' },
];

export const DEALERSHIPS = [
  { id: 'd-1', name: 'Indian Motorcycle of San Francisco', address: '1240 Van Ness Ave, San Francisco, CA 94109', phone: '(415) 555-0192', distance: '3.8 miles', inventory: 14 },
  { id: 'd-2', name: 'Indian Motorcycle of Los Angeles', address: '1901 S La Cienega Blvd, Los Angeles, CA 90034', phone: '(310) 555-0841', distance: '12.4 miles', inventory: 22 },
  { id: 'd-3', name: 'Indian Motorcycle of Austin', address: '8501 Research Blvd, Austin, TX 78758', phone: '(512) 555-0377', distance: '8.1 miles', inventory: 18 },
  { id: 'd-4', name: 'Indian Motorcycle of Chicago', address: '2215 S Michigan Ave, Chicago, IL 60616', phone: '(312) 555-0155', distance: '5.2 miles', inventory: 16 }
];
