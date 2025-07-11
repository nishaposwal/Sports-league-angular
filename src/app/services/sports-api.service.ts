import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { League, LeaguesResponse, SeasonsResponse } from '../models/league.interface';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class SportsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;
  
  // Cache keys for localStorage
  private readonly LEAGUES_CACHE_KEY = 'sports_leagues_cache';
  private readonly SEASON_BADGES_CACHE_KEY = 'season_badges_cache';
  
  // Cache duration: 24 hours in milliseconds
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000;
  
  // In-memory cache for leagues data
  private leaguesCache$: Observable<League[]> | null = null;
  
  // In-memory cache for season badges
  private seasonBadgesCache = new Map<string, Observable<string | null>>();

  getAllLeagues(): Observable<League[]> {
    // Check localStorage cache first
    const cachedData = this.getFromCache<League[]>(this.LEAGUES_CACHE_KEY);
    if (cachedData) {
      console.log('Using cached leagues data');
      return of(cachedData);
    }

    // If no cache or expired, fetch from API
    if (!this.leaguesCache$) {
      console.log('Fetching leagues from API');
      this.leaguesCache$ = this.http.get<LeaguesResponse>(`${this.baseUrl}/all_leagues.php`)
        .pipe(
          map(response => response.leagues || []),
          catchError(error => {
            console.error('Error fetching leagues:', error);
            return of([]);
          }),
          shareReplay(1)
        );
    }

    // Store the result in cache
    this.leaguesCache$.subscribe(leagues => {
      this.setCache(this.LEAGUES_CACHE_KEY, leagues);
    });

    return this.leaguesCache$;
  }

  getSeasonBadge(leagueId: string): Observable<string | null> {
    // Check localStorage cache first
    const cacheKey = `${this.SEASON_BADGES_CACHE_KEY}_${leagueId}`;
    const cachedData = this.getFromCache<string | null>(cacheKey);
    if (cachedData !== null) {
      console.log(`Using cached season badge for league ${leagueId}`);
      return of(cachedData);
    }

    // If no cache or expired, fetch from API
    if (this.seasonBadgesCache.has(leagueId)) {
      return this.seasonBadgesCache.get(leagueId)!;
    }

    console.log(`Fetching season badge for league ${leagueId} from API`);
    const badgeRequest$ = this.http.get<SeasonsResponse>(
      `${this.baseUrl}/search_all_seasons.php?badge=1&id=${leagueId}`
    ).pipe(
      map(response => {
        const seasons = response.seasons || [];
        return seasons.length > 0 ? seasons[0].strBadge || null : null;
      }),
      catchError(error => {
        console.error(`Error fetching season badge for league ${leagueId}:`, error);
        return of(null);
      }),
      shareReplay(1)
    );

    // Store the result in cache
    badgeRequest$.subscribe(badge => {
      this.setCache(cacheKey, badge);
    });

    this.seasonBadgesCache.set(leagueId, badgeRequest$);
    return badgeRequest$;
  }

  private getFromCache<T>(key: string): T | null {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const cacheEntry: CacheEntry<T> = JSON.parse(cached);
      const now = Date.now();

      if (now > cacheEntry.expiresAt) {
        localStorage.removeItem(key);
        return null;
      }

      return cacheEntry.data;
    } catch (error) {
      console.error('Error reading from cache:', error);
      localStorage.removeItem(key);
      return null;
    }
  }

  private setCache<T>(key: string, data: T): void {
    try {
      const now = Date.now();
      const cacheEntry: CacheEntry<T> = {
        data,
        timestamp: now,
        expiresAt: now + this.CACHE_DURATION
      };

      localStorage.setItem(key, JSON.stringify(cacheEntry));
    } catch (error) {
      console.error('Error writing to cache:', error);
    }
  }

  clearCache(): void {
    this.leaguesCache$ = null;
    this.seasonBadgesCache.clear();
    
    // Clear localStorage cache
    try {
      localStorage.removeItem(this.LEAGUES_CACHE_KEY);
      
      // Clear all season badge cache entries
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.SEASON_BADGES_CACHE_KEY)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      console.log('Cache cleared successfully');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  getCacheStatus(): { leagues: boolean; seasonBadges: number } {
    const leaguesCached = this.getFromCache<League[]>(this.LEAGUES_CACHE_KEY) !== null;
    
    let seasonBadgesCount = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.SEASON_BADGES_CACHE_KEY)) {
          seasonBadgesCount++;
        }
      }
    } catch (error) {
      console.error('Error counting cached season badges:', error);
    }

    return {
      leagues: leaguesCached,
      seasonBadges: seasonBadgesCount
    };
  }

  isCacheExpired(): boolean {
    try {
      const cached = localStorage.getItem(this.LEAGUES_CACHE_KEY);
      if (!cached) return true;

      const cacheEntry: CacheEntry<League[]> = JSON.parse(cached);
      return Date.now() > cacheEntry.expiresAt;
    } catch (error) {
      return true;
    }
  }

  forceRefresh(): void {
    // Clear in-memory cache
    this.leaguesCache$ = null;
    this.seasonBadgesCache.clear();
    
    // Clear localStorage cache
    try {
      localStorage.removeItem(this.LEAGUES_CACHE_KEY);
      
      // Clear all season badge cache entries
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.SEASON_BADGES_CACHE_KEY)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      console.log('Cache cleared for force refresh');
    } catch (error) {
      console.error('Error clearing cache for force refresh:', error);
    }
  }
} 