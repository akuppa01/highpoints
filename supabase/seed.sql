-- ============================================================
-- Summit — Seed Data
-- Run AFTER schema.sql
-- ============================================================

-- Clear existing data (for re-seeding)
truncate public.peak_tags cascade;
truncate public.peaks cascade;

-- ============================================================
-- Insert all 50 state highpoints
-- ============================================================

insert into public.peaks (id, slug, name, state, state_code, elevation_ft, prominence_ft, latitude, longitude, difficulty, region, short_description, featured) values
('al', 'cheaha-mountain',  'Cheaha Mountain',   'Alabama',       'AL',  2413,  1158,  33.4857,  -85.8094,  'easy',       'Southeast',  'The highest point in Alabama sits within Cheaha State Park, offering panoramic views across the Talladega National Forest.',                          false),
('ak', 'denali',           'Denali',            'Alaska',        'AK', 20310, 20146,  63.0692, -151.0063,  'technical',  'Alaska',     'The highest peak in North America. Denali is the ultimate highpointing challenge — a full expedition-style climb requiring weeks of commitment.',     true),
('az', 'humphreys-peak',   'Humphreys Peak',    'Arizona',       'AZ', 12633,  5993,  35.3464, -111.6779,  'hard',       'Southwest',  'Rising above the ponderosa pine forests north of Flagstaff, Humphreys Peak is the highest of the San Francisco Peaks.',                          true),
('ar', 'magazine-mountain','Magazine Mountain',  'Arkansas',      'AR',  2753,  1703,  35.1659,  -93.6447,  'moderate',   'Southeast',  'The flat-topped Magazine Mountain rises above the Arkansas River Valley.',                                                                          false),
('ca', 'mount-whitney',    'Mount Whitney',     'California',    'CA', 14505, 10076,  36.5785, -118.2923,  'hard',       'West',       'The highest summit in the contiguous United States, rising abruptly from the desert floor of the Owens Valley.',                                   true),
('co', 'mount-elbert',     'Mount Elbert',      'Colorado',      'CO', 14440,  9093,  39.1178, -106.4453,  'moderate',   'West',       'The highest peak in the Rocky Mountains. Mount Elbert''s straightforward approach belies the thin air of Colorado''s highest terrain.',            true),
('ct', 'bear-mountain',    'Bear Mountain',     'Connecticut',   'CT',  2316,   776,  42.0001,  -73.4832,  'moderate',   'Northeast',  'Connecticut''s highest peak sits at the junction of the Appalachian Trail and the Undermountain Trail.',                                           false),
('de', 'ebright-azimuth',  'Ebright Azimuth',   'Delaware',      'DE',   448,   148,  39.8309,  -75.5193,  'easy',       'Northeast',  'Delaware''s gentle high point sits in a quiet suburban neighborhood.',                                                                              false),
('fl', 'britton-hill',     'Britton Hill',      'Florida',       'FL',   345,    55,  30.8873,  -86.2817,  'easy',       'Southeast',  'The lowest state highpoint in the US. A pleasant walk through longleaf pine forest in the Florida Panhandle.',                                    false),
('ga', 'brasstown-bald',   'Brasstown Bald',    'Georgia',       'GA',  4784,  2379,  34.8737,  -83.8113,  'moderate',   'Southeast',  'Georgia''s highest peak rewards with sweeping views of the Blue Ridge Mountains.',                                                                 false),
('hi', 'mauna-kea',        'Mauna Kea',         'Hawaii',        'HI', 13796, 13796,  19.8207, -155.4681,  'hard',       'Hawaii',     'Measured from its oceanic base, Mauna Kea is the tallest mountain on Earth.',                                                                       true),
('id', 'borah-peak',       'Borah Peak',        'Idaho',         'ID', 12662,  5945,  44.1374, -113.7809,  'hard',       'Northwest',  'Idaho''s highest point features the famous ''Chicken Out Ridge'' — a narrow exposed scramble.',                                                    false),
('il', 'charles-mound',    'Charles Mound',     'Illinois',      'IL',  1235,   235,  42.5047,  -90.2406,  'easy',       'Midwest',    'On private farmland in the Illinois Driftless Area, Charles Mound requires advance permission to visit.',                                          false),
('in', 'hoosier-hill',     'Hoosier Hill',      'Indiana',       'IN',  1257,   177,  40.0025,  -84.8453,  'easy',       'Midwest',    'A quiet forested knoll on the Indiana-Ohio border.',                                                                                                false),
('ia', 'hawkeye-point',    'Hawkeye Point',     'Iowa',          'IA',  1670,   220,  43.4606,  -95.7076,  'easy',       'Midwest',    'Iowa''s highest ground is a gently rolling field in the northwest corner of the state.',                                                           false),
('ks', 'mount-sunflower',  'Mount Sunflower',   'Kansas',        'KS',  4039,   219,  38.9672, -102.0378,  'easy',       'Midwest',    'Kansas''s highest point — marked by a metal sunflower sculpture welded from old farm equipment.',                                                   false),
('ky', 'black-mountain',   'Black Mountain',    'Kentucky',      'KY',  4145,  1345,  36.9145,  -82.8932,  'easy',       'Southeast',  'Straddling the Virginia-Kentucky border in the coalfields of Appalachia.',                                                                          false),
('la', 'driskill-mountain','Driskill Mountain', 'Louisiana',     'LA',   535,   190,  32.4265,  -92.8957,  'easy',       'Southeast',  'A forested hill in central Louisiana — one of the lowest and most accessible highpoints.',                                                          false),
('me', 'mount-katahdin',   'Mount Katahdin',    'Maine',         'ME',  5267,  4288,  45.9044,  -68.9213,  'hard',       'Northeast',  'The northern terminus of the Appalachian Trail and Maine''s great granite summit.',                                                                 true),
('md', 'hoye-crest',       'Hoye-Crest',        'Maryland',      'MD',  3360,   520,  39.2373,  -79.4846,  'moderate',   'Northeast',  'On the slopes of Backbone Mountain along the West Virginia border.',                                                                                false),
('ma', 'mount-greylock',   'Mount Greylock',    'Massachusetts', 'MA',  3489,  2464,  42.6375,  -73.1663,  'moderate',   'Northeast',  'New England''s most storied mountain. Thoreau, Melville, and Hawthorne all walked these slopes.',                                                   false),
('mi', 'mount-arvon',      'Mount Arvon',       'Michigan',      'MI',  1979,   409,  46.7555,  -88.1551,  'easy',       'Midwest',    'Deep in the Upper Peninsula forest, Mount Arvon requires a long forest road drive.',                                                                false),
('mn', 'eagle-mountain',   'Eagle Mountain',    'Minnesota',     'MN',  2301,   681,  47.8987,  -90.5599,  'moderate',   'Midwest',    'Minnesota''s high point sits in the Boundary Waters Canoe Area Wilderness.',                                                                        false),
('ms', 'woodall-mountain', 'Woodall Mountain',  'Mississippi',   'MS',   806,   306,  34.7879,  -88.2407,  'easy',       'Southeast',  'A gentle hill in Tishomingo County. Mississippi''s highpoint is quiet, forested, and unhurried.',                                                  false),
('mo', 'taum-sauk-mountain','Taum Sauk Mountain','Missouri',     'MO',  1772,   672,  37.5703,  -90.7280,  'easy',       'Midwest',    'Missouri''s high point in the St. Francois Mountains features nearby Mina Sauk Falls.',                                                             false),
('mt', 'granite-peak',     'Granite Peak',      'Montana',       'MT', 12799,  7073,  45.1634, -109.8074,  'technical',  'Northwest',  'One of the most difficult state highpoints in the US. Granite Peak demands technical scrambling and backcountry commitment.',                       true),
('ne', 'panorama-point',   'Panorama Point',    'Nebraska',      'NE',  5424,   429,  41.0023, -104.0294,  'easy',       'Midwest',    'The Nebraska Panhandle''s high ground rises gently from the Great Plains.',                                                                         false),
('nv', 'boundary-peak',    'Boundary Peak',     'Nevada',        'NV', 13147,   254,  37.8462, -118.3514,  'hard',       'West',       'Nevada''s high point on the California border, with sweeping Great Basin views.',                                                                   false),
('nh', 'mount-washington', 'Mount Washington',  'New Hampshire', 'NH',  6288,  6148,  44.2706,  -71.3033,  'hard',       'Northeast',  'The highest peak in the Northeast, famous for some of the most extreme weather on Earth.',                                                          true),
('nj', 'high-point',       'High Point',        'New Jersey',    'NJ',  1803,  1052,  41.3206,  -74.6601,  'easy',       'Northeast',  'New Jersey''s highest point is marked by a 220-foot obelisk war memorial visible for miles.',                                                      false),
('nm', 'wheeler-peak',     'Wheeler Peak',      'New Mexico',    'NM', 13161,  4649,  36.5569, -105.4170,  'hard',       'Southwest',  'The crown of the Taos Mountains, rising above the Sangre de Cristo Range.',                                                                        false),
('ny', 'mount-marcy',      'Mount Marcy',       'New York',      'NY',  5344,  4520,  44.1127,  -73.9237,  'moderate',   'Northeast',  'Algonquin people called it Tahawus — ''Cloud Splitter.'' New York''s highest peak anchors the High Peaks of the Adirondacks.',                    true),
('nc', 'mount-mitchell',   'Mount Mitchell',    'North Carolina','NC',  6684,  4541,  35.7650,  -82.2651,  'moderate',   'Southeast',  'The highest peak in the Appalachian Mountains and in the eastern US.',                                                                             false),
('nd', 'white-butte',      'White Butte',       'North Dakota',  'ND',  3506,   806,  46.3867, -103.3023,  'easy',       'Midwest',    'The highest point in North Dakota rises from the badlands of the Little Missouri River country.',                                                   false),
('oh', 'campbell-hill',    'Campbell Hill',     'Ohio',          'OH',  1549,   429,  40.5581,  -83.7099,  'easy',       'Midwest',    'Ohio''s subtly elevated high point sits on the Ohio Hi-Point Career Technology Center campus.',                                                     false),
('ok', 'black-mesa',       'Black Mesa',        'Oklahoma',      'OK',  4973,   993,  36.9317, -102.9970,  'moderate',   'Southwest',  'A remote mesa in Oklahoma''s panhandle where dinosaur tracks have been found.',                                                                     false),
('or', 'mount-hood',       'Mount Hood',        'Oregon',        'OR', 11239,  7677,  45.3735, -121.6960,  'technical',  'Northwest',  'Oregon''s iconic volcanic cone. The standard South Route requires crampons, ice axes, and an early start.',                                        true),
('pa', 'mount-davis',      'Mount Davis',       'Pennsylvania',  'PA',  3213,   913,  39.7861,  -79.1768,  'easy',       'Northeast',  'A gentle forest knoll in Forbes State Forest in the rolling Laurel Highlands.',                                                                    false),
('ri', 'jerimoth-hill',    'Jerimoth Hill',     'Rhode Island',  'RI',   812,   312,  41.8511,  -71.7782,  'easy',       'Northeast',  'The smallest state''s high point — a wooded knoll along a trail just off a rural highway.',                                                        false),
('sc', 'sassafras-mountain','Sassafras Mountain','South Carolina','SC',  3553,  1053,  35.0648,  -82.7773,  'moderate',   'Southeast',  'South Carolina''s highest peak offers an observation tower with views of four states.',                                                             false),
('sd', 'black-elk-peak',   'Black Elk Peak',    'South Dakota',  'SD',  7242,  4322,  43.8659, -103.5316,  'moderate',   'Midwest',    'Named for the Oglala Lakota leader, Black Elk Peak rises above the Black Hills with a historic fire lookout.',                                     false),
('tn', 'clingmans-dome',   'Clingmans Dome',    'Tennessee',     'TN',  6643,  1023,  35.5629,  -83.4985,  'easy',       'Southeast',  'The highest point in the Great Smoky Mountains. A spiral observation ramp gives unobstructed 360° views.',                                         false),
('tx', 'guadalupe-peak',   'Guadalupe Peak',    'Texas',         'TX',  8749,  3661,  31.8913, -104.8603,  'moderate',   'Southwest',  'The roof of Texas rises from the Chihuahuan Desert in one of the most dramatic landscapes in the American Southwest.',                             true),
('ut', 'kings-peak',       'Kings Peak',        'Utah',          'UT', 13528,  6322,  40.7761, -110.3727,  'hard',       'West',       'Utah''s remote high point in the Uinta Mountains requires a 28-mile round trip through pristine wilderness.',                                     false),
('vt', 'mount-mansfield',  'Mount Mansfield',   'Vermont',       'VT',  4393,  2643,  44.5437,  -72.8143,  'moderate',   'Northeast',  'Vermont''s highest peak has a summit ridge shaped like a human profile.',                                                                          false),
('va', 'mount-rogers',     'Mount Rogers',      'Virginia',      'VA',  5729,  1769,  36.6601,  -81.5446,  'moderate',   'Southeast',  'Virginia''s highest peak is a forested summit where wild ponies roam the surrounding balds.',                                                      false),
('wa', 'mount-rainier',    'Mount Rainier',     'Washington',    'WA', 14411, 13211,  46.8523, -121.7603,  'technical',  'Northwest',  'The most glaciated peak in the contiguous US. Rainier is a full mountaineering objective.',                                                        true),
('wv', 'spruce-knob',      'Spruce Knob',       'West Virginia', 'WV',  4863,  2994,  38.6998,  -79.5326,  'easy',       'Northeast',  'The highest point in the Appalachian Mountains south of New England.',                                                                             false),
('wi', 'timms-hill',       'Timms Hill',        'Wisconsin',     'WI',  1951,   551,  45.4517,  -90.1953,  'easy',       'Midwest',    'A forested hill in north-central Wisconsin with a small observation tower and peaceful lake views.',                                               false),
('wy', 'gannett-peak',     'Gannett Peak',      'Wyoming',       'WY', 13809,  7076,  43.1842, -109.6543,  'technical',  'West',       'The most remote and demanding of all state highpoints. A two-day glaciated objective in the Wind River Range.',                                   false);

-- ============================================================
-- Insert peak tags
-- ============================================================

insert into public.peak_tags (peak_id, tag) values
('ak', 'expedition'), ('ak', 'glacial'), ('ak', 'extreme'), ('ak', 'north-america'),
('az', 'volcanic'), ('az', 'above-treeline'), ('az', 'desert'), ('az', 'ridge-walk'),
('ca', 'sierra-nevada'), ('ca', 'granite'), ('ca', 'permits-required'), ('ca', 'iconic'),
('co', '14er'), ('co', 'rocky-mountains'), ('co', 'sawatch'), ('co', 'non-technical'),
('hi', 'volcanic'), ('hi', 'observatory'), ('hi', 'above-clouds'), ('hi', 'sacred'),
('me', 'appalachian-trail'), ('me', 'granite'), ('me', 'exposed'), ('me', 'baxter-state-park'),
('mt', 'technical'), ('mt', 'remote'), ('mt', 'beartooth'), ('mt', 'multi-day'),
('nh', 'extreme-weather'), ('nh', 'northeast'), ('nh', 'classic'), ('nh', 'cog-railway'),
('ny', 'adirondacks'), ('ny', 'algonquin'), ('ny', 'wilderness'), ('ny', 'high-peaks'),
('or', 'volcanic'), ('or', 'glacial'), ('or', 'crevasses'), ('or', 'cascades'),
('tn', 'smokies'), ('tn', 'appalachian'), ('tn', 'accessible'), ('tn', 'observation-tower'),
('tx', 'chihuahuan-desert'), ('tx', 'permian-reef'), ('tx', 'limestone'), ('tx', 'desert-summit'),
('ut', 'uinta-mountains'), ('ut', 'backcountry'), ('ut', 'remote'), ('ut', 'multi-day'),
('wa', 'glacial'), ('wa', 'crevasses'), ('wa', 'technical'), ('wa', 'cascades'), ('wa', 'permits-required'),
('wy', 'wind-river-range'), ('wy', 'glacial'), ('wy', 'technical'), ('wy', 'multi-day'), ('wy', 'remote');
