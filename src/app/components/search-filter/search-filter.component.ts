import { Component, EventEmitter, Output, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { League } from '../../models/league.interface';
import { SportsApiService } from '../../services/sports-api.service';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  @Output() searchChange = new EventEmitter<string>();
  @Output() sportFilterChange = new EventEmitter<string>();

  searchTerm = '';
  selectedSport = '';
  availableSports: string[] = [];
  isLoading = false;

  private readonly sportsApiService = inject(SportsApiService);
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loadSports();
    this.setupSearchDebounce();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadSports(): void {
    this.isLoading = true;
    this.sportsApiService.getAllLeagues().subscribe({
      next: (leagues) => {
        const sports = [...new Set(leagues.map(league => league.strSport))];
        this.availableSports = sports.sort();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading sports:', error);
        this.isLoading = false;
      }
    });
  }

  private setupSearchDebounce(): void {
    this.searchSubject.pipe(
      debounceTime(300), // 300ms debounce
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.searchChange.emit(searchTerm);
    });
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchTerm);
  }

  onSportFilterChange(): void {
    this.sportFilterChange.emit(this.selectedSport);
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedSport = '';
    this.searchChange.emit('');
    this.sportFilterChange.emit('');
  }
} 