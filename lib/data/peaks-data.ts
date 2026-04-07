import type { Peak, Climb, PeakWithClimb } from "@/types";

// ---------------------------------------------------------------------------
// All 50 US State Highpoints
// ---------------------------------------------------------------------------

export const ALL_PEAKS: Peak[] = [
  {
    id: "al",
    slug: "cheaha-mountain",
    name: "Cheaha Mountain",
    state: "Alabama",
    stateCode: "AL",
    elevationFt: 2413,
    prominenceFt: 1158,
    latitude: 33.4857,
    longitude: -85.8094,
    difficulty: "easy",
    region: "Southeast",
    shortDescription:
      "The highest point in Alabama sits within Cheaha State Park, offering panoramic views across the Talladega National Forest.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1400&q=85",
    featured: false,
    tags: ["forest", "state-park", "accessible"],
  },
  {
    id: "ak",
    slug: "denali",
    name: "Denali",
    state: "Alaska",
    stateCode: "AK",
    elevationFt: 20310,
    prominenceFt: 20146,
    latitude: 63.0692,
    longitude: -151.0063,
    difficulty: "technical",
    region: "Alaska",
    shortDescription:
      "The highest peak in North America. Denali is the ultimate highpointing challenge — a full expedition-style climb requiring weeks of commitment.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=1400&q=85",
    featured: true,
    tags: ["expedition", "glacial", "extreme", "north-america"],
  },
  {
    id: "az",
    slug: "humphreys-peak",
    name: "Humphreys Peak",
    state: "Arizona",
    stateCode: "AZ",
    elevationFt: 12633,
    prominenceFt: 5993,
    latitude: 35.3464,
    longitude: -111.6779,
    difficulty: "hard",
    region: "Southwest",
    shortDescription:
      "Rising above the ponderosa pine forests north of Flagstaff, Humphreys Peak is the highest of the San Francisco Peaks — a dormant volcanic field.",
    longDescription:
      "Humphreys Peak stands as the highest point in Arizona, part of the San Francisco volcanic field that last erupted around 1,000 years ago. The standard route climbs through bristlecone pine forest before emerging above treeline onto a rocky ridge with commanding views of the Painted Desert and the Grand Canyon on clear days.\n\nThe approach from the Arizona Snowbowl ski area makes this one of the more accessible high-altitude summits in the Southwest. The trail gains over 3,000 feet through several distinct ecological zones — from ponderosa pine to aspen groves to tundra — before the final exposed ridge walk to the summit.\n\nThe Hopi and Navajo people consider the San Francisco Peaks sacred. Climbing here carries a responsibility to treat the mountain with the reverence it deserves.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85",
    featured: true,
    tags: ["volcanic", "above-treeline", "desert", "ridge-walk"],
  },
  {
    id: "ar",
    slug: "magazine-mountain",
    name: "Magazine Mountain",
    state: "Arkansas",
    stateCode: "AR",
    elevationFt: 2753,
    prominenceFt: 1703,
    latitude: 35.1659,
    longitude: -93.6447,
    difficulty: "moderate",
    region: "Southeast",
    shortDescription:
      "The flat-topped Magazine Mountain rises above the Arkansas River Valley and is home to two state parks connected by the Signal Hill trail.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=85",
    featured: false,
    tags: ["forested", "plateau"],
  },
  {
    id: "ca",
    slug: "mount-whitney",
    name: "Mount Whitney",
    state: "California",
    stateCode: "CA",
    elevationFt: 14505,
    prominenceFt: 10076,
    latitude: 36.5785,
    longitude: -118.2923,
    difficulty: "hard",
    region: "West",
    shortDescription:
      "The highest summit in the contiguous United States, rising abruptly from the desert floor of the Owens Valley to a vast granite sky-island.",
    longDescription:
      "Mount Whitney is the crown jewel of Sierra Nevada highpointing — a 22-mile round trip to the highest point in the lower 48, passing through some of the most dramatic high alpine terrain in North America.\n\nThe Main Trail gains 6,100 feet from Whitney Portal, weaving through boulder fields, past Mirror Lake, over Trail Crest at 13,650 feet, and finally along the exposed Whitney Crest to a broad, rock-strewn summit plateau.\n\nThe views from the top stretch from the White Mountains to the west and the Inyo Mountains to the east. On the clearest days you can see Death Valley, the lowest point in North America, from the highest.\n\nPermits are required and competitive — the lottery opens in February. Altitude sickness is a real concern; acclimatizing at Portal for a night before the climb makes a significant difference.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=85",
    featured: true,
    tags: ["sierra-nevada", "granite", "permits-required", "iconic"],
  },
  {
    id: "co",
    slug: "mount-elbert",
    name: "Mount Elbert",
    state: "Colorado",
    stateCode: "CO",
    elevationFt: 14440,
    prominenceFt: 9093,
    latitude: 39.1178,
    longitude: -106.4453,
    difficulty: "moderate",
    region: "West",
    shortDescription:
      "The highest peak in the Rocky Mountains. Mount Elbert's straightforward approach belies the thin air and wide sky of Colorado's highest terrain.",
    longDescription:
      "At 14,440 feet, Mount Elbert is not just Colorado's highest summit but the highest point in the entire Rocky Mountain range. It sits in the Sawatch Range of central Colorado, flanked by spruce forests and alpine meadows that blaze with wildflowers in July.\n\nThe Northeast Ridge route from the North Elbert trailhead is one of the most popular 14er climbs in the state — 9.5 miles round trip with 4,500 feet of elevation gain. The trail is well-maintained and the terrain is mostly non-technical, but altitude demands respect.\n\nThe summit offers a 360-degree panorama of the Sawatch Range and beyond — Mount Massive to the north, La Plata Peak to the south, and the Continental Divide stretching in both directions. It's the kind of summit that earns its views.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=85",
    featured: true,
    tags: ["14er", "rocky-mountains", "sawatch", "non-technical"],
  },
  {
    id: "ct",
    slug: "bear-mountain",
    name: "Bear Mountain",
    state: "Connecticut",
    stateCode: "CT",
    elevationFt: 2316,
    prominenceFt: 776,
    latitude: 42.0001,
    longitude: -73.4832,
    difficulty: "moderate",
    region: "Northeast",
    shortDescription:
      "Connecticut's highest peak sits at the junction of the Appalachian Trail and the Undermountain Trail in the Berkshire Hills.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=85",
    featured: false,
    tags: ["appalachian-trail", "new-england"],
  },
  {
    id: "de",
    slug: "ebright-azimuth",
    name: "Ebright Azimuth",
    state: "Delaware",
    stateCode: "DE",
    elevationFt: 448,
    prominenceFt: 148,
    latitude: 39.8309,
    longitude: -75.5193,
    difficulty: "easy",
    region: "Northeast",
    shortDescription:
      "Delaware's gentle high point sits in a quiet suburban neighborhood — a marker among some of the flattest highpointing terrain in the country.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1400&q=85",
    featured: false,
    tags: ["flat-state", "drive-up", "suburban"],
  },
  {
    id: "fl",
    slug: "britton-hill",
    name: "Britton Hill",
    state: "Florida",
    stateCode: "FL",
    elevationFt: 345,
    prominenceFt: 55,
    latitude: 30.8873,
    longitude: -86.2817,
    difficulty: "easy",
    region: "Southeast",
    shortDescription:
      "The lowest state highpoint in the US. Britton Hill is a pleasant walk through longleaf pine forest in the Florida Panhandle.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1400&q=85",
    featured: false,
    tags: ["lowest-highpoint", "flat", "accessible"],
  },
  {
    id: "ga",
    slug: "brasstown-bald",
    name: "Brasstown Bald",
    state: "Georgia",
    stateCode: "GA",
    elevationFt: 4784,
    prominenceFt: 2379,
    latitude: 34.8737,
    longitude: -83.8113,
    difficulty: "moderate",
    region: "Southeast",
    shortDescription:
      "Georgia's highest peak rewards with sweeping views of the Blue Ridge Mountains and, on clear days, the Atlanta skyline 90 miles south.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&q=85",
    featured: false,
    tags: ["blue-ridge", "observation-tower"],
  },
  {
    id: "hi",
    slug: "mauna-kea",
    name: "Mauna Kea",
    state: "Hawaii",
    stateCode: "HI",
    elevationFt: 13796,
    prominenceFt: 13796,
    latitude: 19.8207,
    longitude: -155.4681,
    difficulty: "hard",
    region: "Hawaii",
    shortDescription:
      "Measured from its oceanic base, Mauna Kea is the tallest mountain on Earth. The summit observatory complex sits above 40% of Earth's atmosphere.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1400&q=85",
    featured: true,
    tags: ["volcanic", "observatory", "above-clouds", "sacred"],
  },
  {
    id: "id",
    slug: "borah-peak",
    name: "Borah Peak",
    state: "Idaho",
    stateCode: "ID",
    elevationFt: 12662,
    prominenceFt: 5945,
    latitude: 44.1374,
    longitude: -113.7809,
    difficulty: "hard",
    region: "Northwest",
    shortDescription:
      "Idaho's highest point features the famous 'Chicken Out Ridge' — a narrow exposed scramble that separates casual hikers from committed summiteers.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1400&q=85",
    featured: false,
    tags: ["scramble", "exposed-ridge", "remote"],
  },
  {
    id: "il",
    slug: "charles-mound",
    name: "Charles Mound",
    state: "Illinois",
    stateCode: "IL",
    elevationFt: 1235,
    prominenceFt: 235,
    latitude: 42.5047,
    longitude: -90.2406,
    difficulty: "easy",
    region: "Midwest",
    shortDescription:
      "On private farmland in the Illinois Driftless Area, Charles Mound is one of the few highpoints requiring advance permission to visit.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=85",
    featured: false,
    tags: ["private-land", "farmland"],
  },
  {
    id: "in",
    slug: "hoosier-hill",
    name: "Hoosier Hill",
    state: "Indiana",
    stateCode: "IN",
    elevationFt: 1257,
    prominenceFt: 177,
    latitude: 40.0025,
    longitude: -84.8453,
    difficulty: "easy",
    region: "Midwest",
    shortDescription:
      "A quiet forested knoll on the Indiana-Ohio border. Hoosier Hill is a low-key but genuine highpoint experience.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=85",
    featured: false,
    tags: ["forested", "accessible"],
  },
  {
    id: "ia",
    slug: "hawkeye-point",
    name: "Hawkeye Point",
    state: "Iowa",
    stateCode: "IA",
    elevationFt: 1670,
    prominenceFt: 220,
    latitude: 43.4606,
    longitude: -95.7076,
    difficulty: "easy",
    region: "Midwest",
    shortDescription:
      "Iowa's highest ground is a gently rolling field in the northwest corner of the state — flat plains highpointing at its most pastoral.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=85",
    featured: false,
    tags: ["farmland", "plains", "drive-up"],
  },
  {
    id: "ks",
    slug: "mount-sunflower",
    name: "Mount Sunflower",
    state: "Kansas",
    stateCode: "KS",
    elevationFt: 4039,
    prominenceFt: 219,
    latitude: 38.9672,
    longitude: -102.0378,
    difficulty: "easy",
    region: "Midwest",
    shortDescription:
      "Kansas's highest point is a monument on private land — marked by a metal sunflower sculpture welded together from old farm equipment.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=85",
    featured: false,
    tags: ["plains", "private-land", "unique-marker"],
  },
  {
    id: "ky",
    slug: "black-mountain",
    name: "Black Mountain",
    state: "Kentucky",
    stateCode: "KY",
    elevationFt: 4145,
    prominenceFt: 1345,
    latitude: 36.9145,
    longitude: -82.8932,
    difficulty: "easy",
    region: "Southeast",
    shortDescription:
      "Straddling the Virginia-Kentucky border in the coalfields of Appalachia, Black Mountain is accessible by paved road to within a short walk of the summit.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&q=85",
    featured: false,
    tags: ["appalachian", "drive-up"],
  },
  {
    id: "la",
    slug: "driskill-mountain",
    name: "Driskill Mountain",
    state: "Louisiana",
    stateCode: "LA",
    elevationFt: 535,
    prominenceFt: 190,
    latitude: 32.4265,
    longitude: -92.8957,
    difficulty: "easy",
    region: "Southeast",
    shortDescription:
      "A forested hill in central Louisiana. Driskill Mountain is one of the lowest and most accessible highpoints in the country.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=85",
    featured: false,
    tags: ["forest", "flat-state"],
  },
  {
    id: "me",
    slug: "mount-katahdin",
    name: "Mount Katahdin",
    state: "Maine",
    stateCode: "ME",
    elevationFt: 5267,
    prominenceFt: 4288,
    latitude: 45.9044,
    longitude: -68.9213,
    difficulty: "hard",
    region: "Northeast",
    shortDescription:
      "The northern terminus of the Appalachian Trail and Maine's great granite summit. Katahdin is a rite of passage for serious northeast hikers.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1400&q=85",
    featured: true,
    tags: ["appalachian-trail", "granite", "exposed", "baxter-state-park"],
  },
  {
    id: "md",
    slug: "hoye-crest",
    name: "Hoye-Crest",
    state: "Maryland",
    stateCode: "MD",
    elevationFt: 3360,
    prominenceFt: 520,
    latitude: 39.2373,
    longitude: -79.4846,
    difficulty: "moderate",
    region: "Northeast",
    shortDescription:
      "On the slopes of Backbone Mountain along the West Virginia border, Hoye-Crest is reached by a short hike through mixed forest.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=85",
    featured: false,
    tags: ["appalachian", "forested"],
  },
  {
    id: "ma",
    slug: "mount-greylock",
    name: "Mount Greylock",
    state: "Massachusetts",
    stateCode: "MA",
    elevationFt: 3489,
    prominenceFt: 2464,
    latitude: 42.6375,
    longitude: -73.1663,
    difficulty: "moderate",
    region: "Northeast",
    shortDescription:
      "New England's most storied mountain. Thoreau, Melville, and Hawthorne all walked these slopes; the summit bears a veteran's war memorial.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=85",
    featured: false,
    tags: ["literary", "new-england", "war-memorial"],
  },
  {
    id: "mi",
    slug: "mount-arvon",
    name: "Mount Arvon",
    state: "Michigan",
    stateCode: "MI",
    elevationFt: 1979,
    prominenceFt: 409,
    latitude: 46.7555,
    longitude: -88.1551,
    difficulty: "easy",
    region: "Midwest",
    shortDescription:
      "Deep in the Upper Peninsula forest, Mount Arvon requires a long forest road drive before a short walk to the true summit.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=85",
    featured: false,
    tags: ["upper-peninsula", "forested", "remote"],
  },
  {
    id: "mn",
    slug: "eagle-mountain",
    name: "Eagle Mountain",
    state: "Minnesota",
    stateCode: "MN",
    elevationFt: 2301,
    prominenceFt: 681,
    latitude: 47.8987,
    longitude: -90.5599,
    difficulty: "moderate",
    region: "Midwest",
    shortDescription:
      "Minnesota's high point sits in the Boundary Waters Canoe Area Wilderness, a pristine lakeland landscape near the Canadian border.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=85",
    featured: false,
    tags: ["boundary-waters", "wilderness", "lake-country"],
  },
  {
    id: "ms",
    slug: "woodall-mountain",
    name: "Woodall Mountain",
    state: "Mississippi",
    stateCode: "MS",
    elevationFt: 806,
    prominenceFt: 306,
    latitude: 34.7879,
    longitude: -88.2407,
    difficulty: "easy",
    region: "Southeast",
    shortDescription:
      "A gentle hill in Tishomingo County, reached by a short hike or drive. Mississippi's highpoint is quiet, forested, and unhurried.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=85",
    featured: false,
    tags: ["forest", "accessible"],
  },
  {
    id: "mo",
    slug: "taum-sauk-mountain",
    name: "Taum Sauk Mountain",
    state: "Missouri",
    stateCode: "MO",
    elevationFt: 1772,
    prominenceFt: 672,
    latitude: 37.5703,
    longitude: -90.7280,
    difficulty: "easy",
    region: "Midwest",
    shortDescription:
      "Missouri's high point in the St. Francois Mountains features nearby Mina Sauk Falls — the highest waterfall in the state.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=85",
    featured: false,
    tags: ["waterfall", "ozarks"],
  },
  {
    id: "mt",
    slug: "granite-peak",
    name: "Granite Peak",
    state: "Montana",
    stateCode: "MT",
    elevationFt: 12799,
    prominenceFt: 7073,
    latitude: 45.1634,
    longitude: -109.8074,
    difficulty: "technical",
    region: "Northwest",
    shortDescription:
      "One of the most difficult state highpoints in the US. Granite Peak demands technical scrambling, route-finding, and backcountry commitment.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1472791810838-fe24c39c36ab?w=1400&q=85",
    featured: true,
    tags: ["technical", "remote", "beartooth", "multi-day"],
  },
  {
    id: "ne",
    slug: "panorama-point",
    name: "Panorama Point",
    state: "Nebraska",
    stateCode: "NE",
    elevationFt: 5424,
    prominenceFt: 429,
    latitude: 41.0023,
    longitude: -104.0294,
    difficulty: "easy",
    region: "Midwest",
    shortDescription:
      "The Nebraska Panhandle's high ground rises gently from the Great Plains near the Colorado and Wyoming borders.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=85",
    featured: false,
    tags: ["plains", "great-plains"],
  },
  {
    id: "nv",
    slug: "boundary-peak",
    name: "Boundary Peak",
    state: "Nevada",
    stateCode: "NV",
    elevationFt: 13147,
    prominenceFt: 254,
    latitude: 37.8462,
    longitude: -118.3514,
    difficulty: "hard",
    region: "West",
    shortDescription:
      "Nevada's high point on the California border. Boundary Peak's strenuous approach through high desert and scree rewards with sweeping Great Basin views.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85",
    featured: false,
    tags: ["desert", "great-basin", "scree"],
  },
  {
    id: "nh",
    slug: "mount-washington",
    name: "Mount Washington",
    state: "New Hampshire",
    stateCode: "NH",
    elevationFt: 6288,
    prominenceFt: 6148,
    latitude: 44.2706,
    longitude: -71.3033,
    difficulty: "hard",
    region: "Northeast",
    shortDescription:
      "The highest peak in the Northeast, famous for some of the most extreme weather on Earth. 'Home of the World's Worst Weather' is a badge worn with pride.",
    longDescription:
      "Mount Washington is a study in contrasts. On a clear summer day, the broad trails to the summit carry hundreds of hikers past wildflowers and granite boulders. But the summit weather station has recorded conditions that rival Antarctic research stations — wind gusts over 200 mph, zero-visibility blizzards in July, and wind chills that can kill unprepared hikers in any month.\n\nThe Tuckerman Ravine Trail is the classic route — 4.2 miles from Pinkham Notch Visitor Center, climbing through dense spruce-fir forest before opening into the glacial cirque of Tuckerman Ravine. The headwall scramble is steep and exposed before the final push to the summit.\n\nThe summit itself is chaotic with observatory buildings, a cog railway terminal, and often hundreds of visitors — but the views on clear days stretch from the Atlantic Ocean to Quebec.\n\nThis was my first 'serious' mountain. The weather changed three times on summit day and I had to shelter behind a cairn in a whiteout that came and went in twenty minutes. Classic Washington.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?w=1400&q=85",
    featured: true,
    tags: ["extreme-weather", "northeast", "classic", "cog-railway"],
  },
  {
    id: "nj",
    slug: "high-point",
    name: "High Point",
    state: "New Jersey",
    stateCode: "NJ",
    elevationFt: 1803,
    prominenceFt: 1052,
    latitude: 41.3206,
    longitude: -74.6601,
    difficulty: "easy",
    region: "Northeast",
    shortDescription:
      "New Jersey's highest point at the tip of Kittatinny Mountain is marked by a 220-foot obelisk war memorial visible for miles.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=85",
    featured: false,
    tags: ["monument", "state-park", "accessible"],
  },
  {
    id: "nm",
    slug: "wheeler-peak",
    name: "Wheeler Peak",
    state: "New Mexico",
    stateCode: "NM",
    elevationFt: 13161,
    prominenceFt: 4649,
    latitude: 36.5569,
    longitude: -105.4170,
    difficulty: "hard",
    region: "Southwest",
    shortDescription:
      "The crown of the Taos Mountains. Wheeler Peak rises above the Sangre de Cristo Range with alpine lakes, bristlecone pines, and wide New Mexico sky.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85",
    featured: false,
    tags: ["sangre-de-cristo", "taos", "alpine-lakes"],
  },
  {
    id: "ny",
    slug: "mount-marcy",
    name: "Mount Marcy",
    state: "New York",
    stateCode: "NY",
    elevationFt: 5344,
    prominenceFt: 4520,
    latitude: 44.1127,
    longitude: -73.9237,
    difficulty: "moderate",
    region: "Northeast",
    shortDescription:
      "Algonquin people called it Tahawus — 'Cloud Splitter.' New York's highest peak anchors the High Peaks region of the Adirondack Wilderness.",
    longDescription:
      "Mount Marcy is the heart of the Adirondack High Peaks. The Van Hoevenberg Trail from Adirondack Loj is the most traveled approach — 14.8 miles round trip with 3,166 feet of gain through boreal forest, past beaver ponds, and up onto the broad windswept summit.\n\nThe Adirondacks have a personality unlike the Rockies or the Sierra. The forest is dense and dark, the trails rooted and rocky. The summit of Marcy emerges suddenly above the treeline — a tundra plateau with 360-degree views of the entire High Peaks.\n\nI climbed Marcy on a cold October morning. The sky was that particular shade of Adirondack blue that only comes in fall. From the summit I could see dozens of other High Peaks spread out below, each one waiting its turn.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1400&q=85",
    featured: true,
    tags: ["adirondacks", "algonquin", "wilderness", "high-peaks"],
  },
  {
    id: "nc",
    slug: "mount-mitchell",
    name: "Mount Mitchell",
    state: "North Carolina",
    stateCode: "NC",
    elevationFt: 6684,
    prominenceFt: 4541,
    latitude: 35.7650,
    longitude: -82.2651,
    difficulty: "moderate",
    region: "Southeast",
    shortDescription:
      "The highest peak in the Appalachian Mountains and in the eastern US. Mount Mitchell's dark spruce-fir forest feels primeval and otherworldly.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&q=85",
    featured: false,
    tags: ["appalachian", "blue-ridge-parkway", "spruce-fir"],
  },
  {
    id: "nd",
    slug: "white-butte",
    name: "White Butte",
    state: "North Dakota",
    stateCode: "ND",
    elevationFt: 3506,
    prominenceFt: 806,
    latitude: 46.3867,
    longitude: -103.3023,
    difficulty: "easy",
    region: "Midwest",
    shortDescription:
      "The highest point in North Dakota rises from the badlands of the Little Missouri River country with views across an ancient sea bed.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=85",
    featured: false,
    tags: ["badlands", "plains"],
  },
  {
    id: "oh",
    slug: "campbell-hill",
    name: "Campbell Hill",
    state: "Ohio",
    stateCode: "OH",
    elevationFt: 1549,
    prominenceFt: 429,
    latitude: 40.5581,
    longitude: -83.7099,
    difficulty: "easy",
    region: "Midwest",
    shortDescription:
      "Ohio's subtly elevated high point sits in the middle of the Ohio Hi-Point Career Technology Center campus.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=85",
    featured: false,
    tags: ["urban-adjacent", "accessible"],
  },
  {
    id: "ok",
    slug: "black-mesa",
    name: "Black Mesa",
    state: "Oklahoma",
    stateCode: "OK",
    elevationFt: 4973,
    prominenceFt: 993,
    latitude: 36.9317,
    longitude: -102.9970,
    difficulty: "moderate",
    region: "Southwest",
    shortDescription:
      "A remote mesa in Oklahoma's panhandle where dinosaur tracks have been found. Black Mesa is a high desert summit at the convergence of three states.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85",
    featured: false,
    tags: ["mesa", "desert", "panhandle", "dinosaur-tracks"],
  },
  {
    id: "or",
    slug: "mount-hood",
    name: "Mount Hood",
    state: "Oregon",
    stateCode: "OR",
    elevationFt: 11239,
    prominenceFt: 7677,
    latitude: 45.3735,
    longitude: -121.6960,
    difficulty: "technical",
    region: "Northwest",
    shortDescription:
      "Oregon's iconic volcanic cone looms over Portland. The standard South Route requires crampons, ice axes, and an early start to avoid afternoon rockfall.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1472791810838-fe24c39c36ab?w=1400&q=85",
    featured: true,
    tags: ["volcanic", "glacial", "crevasses", "cascades"],
  },
  {
    id: "pa",
    slug: "mount-davis",
    name: "Mount Davis",
    state: "Pennsylvania",
    stateCode: "PA",
    elevationFt: 3213,
    prominenceFt: 913,
    latitude: 39.7861,
    longitude: -79.1768,
    difficulty: "easy",
    region: "Northeast",
    shortDescription:
      "A gentle forest knoll in Forbes State Forest. Mount Davis is a pleasant, accessible highpoint in the rolling Laurel Highlands.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=85",
    featured: false,
    tags: ["forested", "accessible"],
  },
  {
    id: "ri",
    slug: "jerimoth-hill",
    name: "Jerimoth Hill",
    state: "Rhode Island",
    stateCode: "RI",
    elevationFt: 812,
    prominenceFt: 312,
    latitude: 41.8511,
    longitude: -71.7782,
    difficulty: "easy",
    region: "Northeast",
    shortDescription:
      "The smallest state's high point — a wooded knoll along a trail just off a rural highway. Jerimoth Hill is a charming footnote in highpointing.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=85",
    featured: false,
    tags: ["new-england", "accessible"],
  },
  {
    id: "sc",
    slug: "sassafras-mountain",
    name: "Sassafras Mountain",
    state: "South Carolina",
    stateCode: "SC",
    elevationFt: 3553,
    prominenceFt: 1053,
    latitude: 35.0648,
    longitude: -82.7773,
    difficulty: "moderate",
    region: "Southeast",
    shortDescription:
      "South Carolina's highest peak on the Blue Ridge Escarpment offers an observation tower with views of four states on clear days.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&q=85",
    featured: false,
    tags: ["blue-ridge", "observation-tower"],
  },
  {
    id: "sd",
    slug: "black-elk-peak",
    name: "Black Elk Peak",
    state: "South Dakota",
    stateCode: "SD",
    elevationFt: 7242,
    prominenceFt: 4322,
    latitude: 43.8659,
    longitude: -103.5316,
    difficulty: "moderate",
    region: "Midwest",
    shortDescription:
      "Named for the Oglala Lakota leader, Black Elk Peak rises above the Black Hills with a historic fire lookout at the summit.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1400&q=85",
    featured: false,
    tags: ["black-hills", "fire-lookout", "sacred"],
  },
  {
    id: "tn",
    slug: "clingmans-dome",
    name: "Clingmans Dome",
    state: "Tennessee",
    stateCode: "TN",
    elevationFt: 6643,
    prominenceFt: 1023,
    latitude: 35.5629,
    longitude: -83.4985,
    difficulty: "easy",
    region: "Southeast",
    shortDescription:
      "The highest point in the Great Smoky Mountains. A spiral observation ramp at the summit gives unobstructed 360° views across the ancient Appalachian ranges.",
    longDescription:
      "Clingmans Dome straddles the Tennessee-North Carolina state line in the heart of the Great Smoky Mountains National Park. At 6,643 feet, it's the third highest peak in the Appalachians — but the most visited, drawing over a million visitors per year.\n\nThe paved half-mile ramp from the parking lot to the summit observation tower is misleadingly steep, but the final views reward the effort. On clear days you can see seven states. On misty days — which is most days, hence the Smokies' name — the tower rises above an ocean of cloud and ancient blue-ridged peaks disappear and reappear in the haze.\n\nThe summit forest is Fraser fir and red spruce — a boreal ecosystem more typical of Canada than the American South. The silence at dawn, before the crowds arrive, feels like standing inside a cloud.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&q=85",
    featured: false,
    tags: ["smokies", "appalachian", "accessible", "observation-tower"],
  },
  {
    id: "tx",
    slug: "guadalupe-peak",
    name: "Guadalupe Peak",
    state: "Texas",
    stateCode: "TX",
    elevationFt: 8749,
    prominenceFt: 3661,
    latitude: 31.8913,
    longitude: -104.8603,
    difficulty: "moderate",
    region: "Southwest",
    shortDescription:
      "The roof of Texas rises from the Chihuahuan Desert in one of the most dramatic landscapes in the American Southwest.",
    longDescription:
      "Guadalupe Peak is a study in desert geology laid bare. The limestone reef that forms the peak was once the edge of a vast inland sea — the Permian Reef, deposited 265 million years ago. The trail climbs through scrub and desert willows, past exposed reef ledges, to a summit pyramid crowned with a commemorative metal star.\n\nThe Guadalupe Peak Trail gains 3,000 feet over 4.2 miles — relentless switchbacks with minimal shade. But every step reveals new geological drama. The El Capitan cliff face drops 2,000 feet below and the Chihuahuan Desert spreads to the horizon in three countries.\n\nThe summit views at golden hour are extraordinary: the white salt flats of Salt Lake glowing to the north, the Guadalupe Mountains National Park spread below, and New Mexico's high desert fading into blue in every direction.\n\nTexas was the first state I highpointed deliberately. I went back twice.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1400&q=85",
    featured: true,
    tags: ["chihuahuan-desert", "permian-reef", "limestone", "desert-summit"],
  },
  {
    id: "ut",
    slug: "kings-peak",
    name: "Kings Peak",
    state: "Utah",
    stateCode: "UT",
    elevationFt: 13528,
    prominenceFt: 6322,
    latitude: 40.7761,
    longitude: -110.3727,
    difficulty: "hard",
    region: "West",
    shortDescription:
      "Utah's remote high point in the Uinta Mountains requires a 28-mile round trip through pristine wilderness — a true backcountry adventure.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85",
    featured: false,
    tags: ["uinta-mountains", "backcountry", "remote", "multi-day"],
  },
  {
    id: "vt",
    slug: "mount-mansfield",
    name: "Mount Mansfield",
    state: "Vermont",
    stateCode: "VT",
    elevationFt: 4393,
    prominenceFt: 2643,
    latitude: 44.5437,
    longitude: -72.8143,
    difficulty: "moderate",
    region: "Northeast",
    shortDescription:
      "Vermont's highest peak has a summit ridge shaped like a human profile. The Long Trail traverses its face, part of the oldest long-distance hiking trail in the US.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1400&q=85",
    featured: false,
    tags: ["long-trail", "new-england", "gondola-option"],
  },
  {
    id: "va",
    slug: "mount-rogers",
    name: "Mount Rogers",
    state: "Virginia",
    stateCode: "VA",
    elevationFt: 5729,
    prominenceFt: 1769,
    latitude: 36.6601,
    longitude: -81.5446,
    difficulty: "moderate",
    region: "Southeast",
    shortDescription:
      "Virginia's highest peak is a forested summit in the Grayson Highlands — wild ponies roam the surrounding balds, one of the Appalachian Trail's most beloved sections.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&q=85",
    featured: false,
    tags: ["appalachian-trail", "wild-ponies", "balds"],
  },
  {
    id: "wa",
    slug: "mount-rainier",
    name: "Mount Rainier",
    state: "Washington",
    stateCode: "WA",
    elevationFt: 14411,
    prominenceFt: 13211,
    latitude: 46.8523,
    longitude: -121.7603,
    difficulty: "technical",
    region: "Northwest",
    shortDescription:
      "The most glaciated peak in the contiguous US. Rainier is a full mountaineering objective requiring crevasse travel, rope teams, and summit permits.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1472791810838-fe24c39c36ab?w=1400&q=85",
    featured: true,
    tags: ["glacial", "crevasses", "technical", "cascades", "permits-required"],
  },
  {
    id: "wv",
    slug: "spruce-knob",
    name: "Spruce Knob",
    state: "West Virginia",
    stateCode: "WV",
    elevationFt: 4863,
    prominenceFt: 2994,
    latitude: 38.6998,
    longitude: -79.5326,
    difficulty: "easy",
    region: "Northeast",
    shortDescription:
      "The highest point in the Appalachian Mountains south of New England. A short trail through spruce-fir forest leads to a stone observation tower.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=85",
    featured: false,
    tags: ["appalachian", "spruce-fir", "drive-up"],
  },
  {
    id: "wi",
    slug: "timms-hill",
    name: "Timms Hill",
    state: "Wisconsin",
    stateCode: "WI",
    elevationFt: 1951,
    prominenceFt: 551,
    latitude: 45.4517,
    longitude: -90.1953,
    difficulty: "easy",
    region: "Midwest",
    shortDescription:
      "A forested hill in north-central Wisconsin with a small observation tower and peaceful lake views. Wisconsin's quiet high point.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=85",
    featured: false,
    tags: ["forested", "lake-view", "accessible"],
  },
  {
    id: "wy",
    slug: "gannett-peak",
    name: "Gannett Peak",
    state: "Wyoming",
    stateCode: "WY",
    elevationFt: 13809,
    prominenceFt: 7076,
    latitude: 43.1842,
    longitude: -109.6543,
    difficulty: "technical",
    region: "West",
    shortDescription:
      "The most remote and demanding of all state highpoints. Gannett Peak is a two-day glaciated objective deep in the Wind River Range.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1472791810838-fe24c39c36ab?w=1400&q=85",
    featured: false,
    tags: ["wind-river-range", "glacial", "technical", "multi-day", "remote"],
  },
];

// ---------------------------------------------------------------------------
// Detailed climb data for completed peaks
// ---------------------------------------------------------------------------

export const SAMPLE_CLIMBS: Record<string, Climb> = {
  tx: {
    id: "climb-tx",
    peakId: "tx",
    completed: true,
    completedDate: "2023-03-12",
    distanceMiles: 8.4,
    elevationGainFt: 3000,
    durationMinutes: 330,
    routeName: "Guadalupe Peak Trail",
    routeDescription:
      "The only maintained trail to the summit — a relentless set of switchbacks gaining 3,000 feet from the Pine Springs Visitor Center. The trail begins in Chihuahuan Desert scrub and passes through several microhabitats before reaching the exposed limestone summit.",
    stravaUrl: "https://www.strava.com/activities/example",
    alltrailsUrl: "https://www.alltrails.com/trail/us/texas/guadalupe-peak-trail",
    personalNotes:
      "My first intentional state highpoint. Left the trailhead at 6 AM in cold desert air, summited by 10. The El Capitan cliff views stopped me cold — that limestone wall just falls away to the desert floor. Packed the wrong food (a single Clif bar) and bonked hard on the descent. Would go back in a heartbeat.",
    weatherNotes: "Clear skies, 28°F at trailhead, 45°F at summit, wind 15 mph",
    gearNotes:
      "Trail runners, poles, base layer + midlayer. Microspikes not needed but I brought them just in case.",
    rating: 5,
    photos: [
      {
        id: "ph-tx-1",
        climbId: "climb-tx",
        imageUrl:
          "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
        caption: "Summit marker at 8,749 ft — the Roof of Texas",
        sortOrder: 0,
      },
      {
        id: "ph-tx-2",
        climbId: "climb-tx",
        imageUrl:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
        caption: "Looking south across the Chihuahuan Desert",
        sortOrder: 1,
      },
      {
        id: "ph-tx-3",
        climbId: "climb-tx",
        imageUrl:
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
        caption: "El Capitan from below — 2,000 feet of exposed limestone",
        sortOrder: 2,
      },
    ],
  },
  co: {
    id: "climb-co",
    peakId: "co",
    completed: true,
    completedDate: "2023-07-08",
    distanceMiles: 9.5,
    elevationGainFt: 4500,
    durationMinutes: 390,
    routeName: "Northeast Ridge (North Elbert Trailhead)",
    routeDescription:
      "The classic approach — well-graded trail through spruce forest transitioning to alpine tundra above treeline. The final half-mile is a gentle ridge walk to the broad summit.",
    stravaUrl: "https://www.strava.com/activities/example",
    alltrailsUrl:
      "https://www.alltrails.com/trail/us/colorado/mount-elbert-via-north-elbert-trail",
    personalNotes:
      "Set out at 4:30 AM from the trailhead to beat afternoon thunderstorms. Hit treeline at first light — the kind of alpenglow that makes you understand why people become mountaineers. The summit is enormous, a wide plateau with 360-degree Sawatch views. Counted at least 20 other peaks from the top.",
    weatherNotes:
      "Partly cloudy, 38°F at trailhead, 50°F at summit, afternoon storms built by 1 PM",
    gearNotes:
      "Trail runners, rain jacket mandatory (summer Colorado), trekking poles, extra layers.",
    rating: 5,
    photos: [
      {
        id: "ph-co-1",
        climbId: "climb-co",
        imageUrl:
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
        caption: "Alpenglow on the Sawatch Range from the summit",
        sortOrder: 0,
      },
      {
        id: "ph-co-2",
        climbId: "climb-co",
        imageUrl:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
        caption: "The ridge leading to the summit plateau",
        sortOrder: 1,
      },
    ],
  },
  ca: {
    id: "climb-ca",
    peakId: "ca",
    completed: true,
    completedDate: "2023-09-02",
    distanceMiles: 22.0,
    elevationGainFt: 6100,
    durationMinutes: 780,
    routeName: "Main Trail from Whitney Portal",
    routeDescription:
      "The standard 11-mile route from Whitney Portal at 8,360 feet. Passes Lower Whitney Portal to Mirror Lake, then a long traverse to Trail Camp before the 99 switchbacks to Trail Crest and the final ridge walk.",
    stravaUrl: "https://www.strava.com/activities/example",
    alltrailsUrl:
      "https://www.alltrails.com/trail/us/california/mount-whitney-trail",
    personalNotes:
      "Permit day hike — started at midnight, headlamp through the forest, hit Trail Camp as the sky turned violet. The 99 switchbacks are demoralizing until they aren't. Trail Crest at 13,650 feet hit me hard; first time I've ever felt genuinely altitude-impaired. Descended the opposite side just to touch the John Muir Trail. The view east from the summit is pure vertical — the Owens Valley 10,000 feet below.",
    weatherNotes: "Perfect September bluebird. 65°F at summit. No wind.",
    gearNotes:
      "Hiking boots, poles, micro-spikes (small patch of ice on switchbacks), headlamp essential for overnight start.",
    rating: 5,
    photos: [
      {
        id: "ph-ca-1",
        climbId: "climb-ca",
        imageUrl:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
        caption: "Trail Crest at 13,650 ft — looking into the Sierra backcountry",
        sortOrder: 0,
      },
      {
        id: "ph-ca-2",
        climbId: "climb-ca",
        imageUrl:
          "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
        caption: "The summit plateau — 14,505 ft, highest in the lower 48",
        sortOrder: 1,
      },
    ],
  },
  az: {
    id: "climb-az",
    peakId: "az",
    completed: true,
    completedDate: "2023-05-20",
    distanceMiles: 9.0,
    elevationGainFt: 3333,
    durationMinutes: 360,
    routeName: "Humphreys Peak Trail from Arizona Snowbowl",
    routeDescription:
      "Starts at 9,300 feet at the Snowbowl ski area, climbing through dense aspen and mixed conifer forest before opening into alpine tundra on the upper ridge.",
    stravaUrl: "https://www.strava.com/activities/example",
    alltrailsUrl:
      "https://www.alltrails.com/trail/us/arizona/humphreys-peak-trail",
    personalNotes:
      "The aspen forest on the lower flanks was electric green with May growth. Above treeline the summit ridge was exposed and cold — significantly colder than Flagstaff below. Could see the Grand Canyon's north rim faintly from the summit. The mountain's volcanic origin is apparent in the loose cinder debris near the top.",
    weatherNotes: "Cool and windy, 55°F at trailhead, 38°F and gusting at summit",
    gearNotes: "Light layers, wind jacket essential on the exposed ridge.",
    rating: 4,
    photos: [
      {
        id: "ph-az-1",
        climbId: "climb-az",
        imageUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        caption: "Above treeline on the Humphreys summit ridge",
        sortOrder: 0,
      },
    ],
  },
  nh: {
    id: "climb-nh",
    peakId: "nh",
    completed: true,
    completedDate: "2023-10-14",
    distanceMiles: 8.4,
    elevationGainFt: 3900,
    durationMinutes: 420,
    routeName: "Tuckerman Ravine Trail",
    routeDescription:
      "From Pinkham Notch Visitor Center, the trail climbs through dense boreal forest into the glacial cirque of Tuckerman Ravine, then up the headwall and across the summit cone.",
    stravaUrl: "https://www.strava.com/activities/example",
    alltrailsUrl:
      "https://www.alltrails.com/trail/us/new-hampshire/mount-washington-via-tuckerman-ravine-trail",
    personalNotes:
      "October in the White Mountains is a different animal. The forest was peak color from the trailhead — reds and oranges giving way to scrub, then krummholz, then bare tundra. The weather changed twice in 90 minutes near the summit. A whiteout appeared and dissolved in under twenty minutes; I sheltered behind a cairn and watched it happen like a time-lapse. The summit building was closed — wind instruments spinning. Raw and incredible.",
    weatherNotes:
      "Started 45°F sunny, summit reached 28°F with 40 mph gusts and two passing whitecaps",
    gearNotes:
      "This mountain demands layers. Waterproof shell, warm hat, gloves — even in October. The sign at the base says 'Worst Weather on Earth' and they mean it.",
    rating: 5,
    photos: [
      {
        id: "ph-nh-1",
        climbId: "climb-nh",
        imageUrl:
          "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?w=800&q=80",
        caption: "Looking up the Tuckerman Ravine headwall",
        sortOrder: 0,
      },
    ],
  },
  ny: {
    id: "climb-ny",
    peakId: "ny",
    completed: true,
    completedDate: "2023-10-28",
    distanceMiles: 14.8,
    elevationGainFt: 3166,
    durationMinutes: 480,
    routeName: "Van Hoevenberg Trail from Adirondack Loj",
    routeDescription:
      "The most direct route from the Adirondack Mountain Club's High Peaks Information Center, climbing through boreal forest before the open summit plateau above treeline.",
    stravaUrl: "https://www.strava.com/activities/example",
    alltrailsUrl:
      "https://www.alltrails.com/trail/us/new-york/mount-marcy-via-van-hoevenberg-trail",
    personalNotes:
      "Cold and clear October morning. The Adirondack forest is rooted and dark — nothing like the West. Every trail here is a negotiation with the terrain, not a simple path. The summit appeared suddenly above treeline, a wide tundra plateau ringed with krummholz. I counted 26 High Peaks from the top in the sharp October light. The Adirondacks rewarded patience.",
    weatherNotes: "28°F at summit, clear, wind 20 mph from the northwest",
    gearNotes: "Full winter kit — nearly froze my hands on the descent.",
    rating: 5,
    photos: [
      {
        id: "ph-ny-1",
        climbId: "climb-ny",
        imageUrl:
          "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
        caption: "Adirondack High Peaks from the summit of Marcy",
        sortOrder: 0,
      },
    ],
  },
  tn: {
    id: "climb-tn",
    peakId: "tn",
    completed: true,
    completedDate: "2024-04-06",
    distanceMiles: 1.0,
    elevationGainFt: 330,
    durationMinutes: 75,
    routeName: "Forney Ridge Trail to Observation Tower",
    routeDescription:
      "A short but steep paved ramp from the Clingmans Dome parking area to the iconic concrete observation tower. The highest drive-to point in the Smokies.",
    stravaUrl: "https://www.strava.com/activities/example",
    alltrailsUrl:
      "https://www.alltrails.com/trail/us/north-carolina/clingmans-dome-via-forney-ridge-trail",
    personalNotes:
      "Spring fog hung over the Smokies — you could just make out the ridgelines through the mist. The observation tower sits above the cloud layer on clear days but today it disappeared into a grey sea. The Fraser firs up here have been hammered by the woolly adelgid and look like silver ghosts against the fog. Melancholy and beautiful in equal measure.",
    weatherNotes: "Low clouds, 48°F, light mist — quintessential Smokies weather",
    gearNotes: "Light rain jacket, no poles needed for the paved path.",
    rating: 4,
    photos: [
      {
        id: "ph-tn-1",
        climbId: "climb-tn",
        imageUrl:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
        caption: "Blue Ridge ranges disappearing into spring fog",
        sortOrder: 0,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Derived helpers
// ---------------------------------------------------------------------------

export function getAllPeaksWithClimbs(): PeakWithClimb[] {
  return ALL_PEAKS.map((peak) => ({
    ...peak,
    climb: SAMPLE_CLIMBS[peak.id],
  }));
}

export function getCompletedPeaks(): PeakWithClimb[] {
  return getAllPeaksWithClimbs().filter((p) => p.climb?.completed);
}

export function getPeakBySlug(slug: string): PeakWithClimb | undefined {
  const peak = ALL_PEAKS.find((p) => p.slug === slug);
  if (!peak) return undefined;
  return { ...peak, climb: SAMPLE_CLIMBS[peak.id] };
}

export function getFeaturedPeaks(): PeakWithClimb[] {
  return getAllPeaksWithClimbs().filter((p) => p.featured);
}

export const TOTAL_PEAKS = ALL_PEAKS.length;
export const COMPLETED_PEAKS = Object.keys(SAMPLE_CLIMBS).length;
