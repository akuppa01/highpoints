export type Difficulty = "easy" | "moderate" | "hard" | "technical";

export type Region =
  | "Northeast"
  | "Southeast"
  | "Midwest"
  | "Southwest"
  | "West"
  | "Northwest"
  | "Alaska"
  | "Hawaii";

export interface Peak {
  id: string;
  slug: string;
  name: string;
  state: string;
  stateCode: string;
  elevationFt: number;
  prominenceFt?: number;
  latitude: number;
  longitude: number;
  difficulty?: Difficulty;
  region: Region;
  shortDescription?: string;
  longDescription?: string;
  heroImageUrl?: string;
  featured: boolean;
  tags?: string[];
  createdAt?: string;
}

export interface Climb {
  id: string;
  peakId: string;
  userId?: string;
  completed: boolean;
  completedDate?: string;
  distanceMiles?: number;
  elevationGainFt?: number;
  durationMinutes?: number;
  routeName?: string;
  routeDescription?: string;
  stravaUrl?: string;
  alltrailsUrl?: string;
  personalNotes?: string;
  weatherNotes?: string;
  gearNotes?: string;
  rating?: number;
  photos?: ClimbPhoto[];
  createdAt?: string;
}

export interface ClimbPhoto {
  id: string;
  climbId: string;
  imageUrl: string;
  caption?: string;
  sortOrder: number;
}

export interface PeakWithClimb extends Peak {
  climb?: Climb;
}

export interface ProgressStats {
  completed: number;
  total: number;
  totalElevationGainFt: number;
  totalDistanceMiles: number;
  totalHours: number;
  highestPeak?: PeakWithClimb;
  latestClimb?: PeakWithClimb;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  homeState?: string;
  createdAt: string;
}
