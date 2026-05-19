export type Difficulty = "easy" | "moderate" | "hard" | "technical";

export type RecordStatus =
  | "want_to_climb"
  | "planning"
  | "partially_climbed"
  | "visited"
  | "completed"
  | "revisit";

export type Visibility = "private" | "public";

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

export interface PeakSummary {
  id: string;
  slug: string;
  name: string;
  state?: string;
  stateCode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  elevationFt?: number;
  heroImageUrl?: string;
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

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio?: string | null;
  avatarUrl?: string | null;
  homeBase?: string | null;
  favoriteRegion?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface PeakRecordMedia {
  id: string;
  peakRecordId: string;
  storagePath?: string | null;
  mediaUrl: string;
  thumbUrl?: string | null;
  caption?: string | null;
  sourceType: "upload" | "external";
  visibility: Visibility;
  isHighlight: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface StravaSummary {
  activityUrl?: string | null;
  activityTitle?: string | null;
  activityDate?: string | null;
  distanceMiles?: number | null;
  elevationGainFt?: number | null;
  movingTimeMinutes?: number | null;
  paceText?: string | null;
  routeMapImageUrl?: string | null;
  source: "manual" | "link" | "oauth";
}

export interface PeakRecord {
  id: string;
  userId: string;
  canonicalPeakId?: string | null;
  slug: string;
  peakName: string;
  locationLabel?: string | null;
  state?: string | null;
  country?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  status: RecordStatus;
  dateClimbed?: string | null;
  plannedFor?: string | null;
  routeName?: string | null;
  companions?: string | null;
  weather?: string | null;
  difficulty?: string | null;
  distanceMiles?: number | null;
  elevationGainFt?: number | null;
  durationMinutes?: number | null;
  notes?: string | null;
  anecdotes?: string | null;
  specialMemories?: string | null;
  privateNotes?: string | null;
  publicNotes?: string | null;
  favoriteMoment?: string | null;
  lessonsLearned?: string | null;
  gearNotes?: string | null;
  audioTranscript?: string | null;
  externalAlbumLinks: string[];
  heroPhotoUrl?: string | null;
  isPublished: boolean;
  showNotesPublicly: boolean;
  showMediaPublicly: boolean;
  showStatsPublicly: boolean;
  showStravaPublicly: boolean;
  strava: StravaSummary;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
  peak?: PeakSummary | null;
  media?: PeakRecordMedia[];
}

export interface DashboardStats {
  totalRecords: number;
  completed: number;
  planned: number;
  revisits: number;
  totalElevationGainFt: number;
  totalDistanceMiles: number;
  totalTrailMinutes: number;
  highestPeakName?: string;
}

export interface PublicProfileStats {
  totalPeaksClimbed: number;
  totalElevationGainFt: number;
  totalDistanceMiles: number;
  totalTrailMinutes: number;
  highestSummit?: {
    name: string;
    elevationFt?: number | null;
  };
  regionsCovered: string[];
  statesCovered: string[];
}

export interface PublishedPeakRecord {
  id: string;
  peakRecordId: string;
  userId: string;
  username: string;
  userDisplayName: string;
  userAvatarUrl?: string | null;
  slug: string;
  peakName: string;
  locationLabel?: string | null;
  state?: string | null;
  country?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  status: RecordStatus;
  dateClimbed?: string | null;
  routeName?: string | null;
  weather?: string | null;
  difficulty?: string | null;
  distanceMiles?: number | null;
  elevationGainFt?: number | null;
  durationMinutes?: number | null;
  publicNotes?: string | null;
  anecdotes?: string | null;
  specialMemories?: string | null;
  favoriteMoment?: string | null;
  lessonsLearned?: string | null;
  gearNotes?: string | null;
  audioTranscript?: string | null;
  externalAlbumLinks: string[];
  heroPhotoUrl?: string | null;
  peak?: PeakSummary | null;
  media: PeakRecordMedia[];
  strava: StravaSummary;
  publishedAt: string;
  updatedAt: string;
}
