import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { League } from '../../models/league.interface';
import { SportsApiService } from '../../services/sports-api.service';
import { LeagueCardComponent } from '../league-card/league-card.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';

@Component({
  selector: 'app-leagues-grid',
  standalone: true,
  imports: [CommonModule, LeagueCardComponent, SearchFilterComponent],
  templateUrl: './leagues-grid.component.html',
  styleUrls: ['./leagues-grid.component.scss']
})
export class LeaguesGridComponent implements OnInit {
  filteredLeagues$: Observable<League[]> = of([]);
  isLoading = false;
  error: string | null = null;
  isDataFromCache = false;

  private readonly sportsApiService = inject(SportsApiService);
  private allLeagues: League[] = [];
  private searchTerm$ = new BehaviorSubject<string>('');
  private selectedSport$ = new BehaviorSubject<string>('');
  private allLeagues$ = new BehaviorSubject<League[]>([]);

  ngOnInit(): void {
    this.loadLeagues();
    this.filteredLeagues$ = combineLatest([
      this.allLeagues$,
      this.searchTerm$,
      this.selectedSport$
    ]).pipe(
      map(([leagues, searchTerm, selectedSport]) => {
        let filtered = leagues;
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filtered = filtered.filter(league =>
            league.strLeague.toLowerCase().includes(term) ||
            league.strLeagueAlternate?.toLowerCase().includes(term)
          );
        }
        if (selectedSport) {
          filtered = filtered.filter(league => league.strSport === selectedSport);
        }
        return filtered;
      })
    );
  }

  private loadLeagues(): void {
    this.isLoading = true;
    this.error = null;
    this.isDataFromCache = !this.sportsApiService.isCacheExpired();
    this.sportsApiService.getAllLeagues().pipe(
      tap(leagues => {
        this.allLeagues = leagues || [];
        this.allLeagues$.next(this.allLeagues);
        this.isLoading = false;
      }),
      catchError(error => {
        console.error('Error loading leagues:', error);
        this.error = 'Failed to load leagues. Please try again later.';
        this.isLoading = false;
        return of([]);
      })
    ).subscribe();
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm$.next(searchTerm);
  }

  onSportFilterChange(selectedSport: string): void {
    this.selectedSport$.next(selectedSport);
  }

  onLeagueClick(league: League): void {
    console.log('League clicked:', league);
    // Here you can add navigation to a detailed view or modal
  }

  retryLoad(): void {
    this.sportsApiService.clearCache();
    this.loadLeagues();
  }

  forceRefresh(): void {
    this.sportsApiService.forceRefresh();
    this.loadLeagues();
  }

  trackByLeagueId(index: number, league: League): string {
    return league.idLeague;
  }
} 