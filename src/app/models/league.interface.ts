export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
}

export interface LeaguesResponse {
  leagues: League[];
}

export interface Season {
  idLeague: string;
  strSeason: string;
  strBadge?: string;
}

export interface SeasonsResponse {
  seasons: Season[];
} 