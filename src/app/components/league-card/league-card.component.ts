import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { League } from '../../models/league.interface';
import { SportsApiService } from '../../services/sports-api.service';

@Component({
  selector: 'app-league-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './league-card.component.html',
  styleUrls: ['./league-card.component.scss']
})
export class LeagueCardComponent implements OnInit {
  @Input({ required: true }) league!: League;
  @Output() leagueClick = new EventEmitter<League>();

  private readonly sportsApiService = inject(SportsApiService);
  
  seasonBadge$: Observable<string | null> | null = null;

  ngOnInit(): void {
  }


  private loadSeasonBadge(): void {
    if (this.league?.idLeague) {
      this.seasonBadge$ = this.sportsApiService.getSeasonBadge(this.league.idLeague);
    }
  }

  onCardClick(): void {
    this.loadSeasonBadge();
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }

  getSportIcon(sport: string): string {
    const sportIcons: { [key: string]: string } = {
      'Soccer': '⚽',
      'Basketball': '🏀',
      'Baseball': '⚾',
      'American Football': '🏈',
      'Ice Hockey': '🏒',
      'Tennis': '🎾',
      'Cricket': '🏏',
      'Rugby': '🏉',
      'Volleyball': '🏐',
      'Badminton': '🏸',
      'Table Tennis': '🏓',
      'Golf': '⛳',
      'Boxing': '🥊',
      'MMA': '🥋',
      'Wrestling': '🤼',
      'Swimming': '🏊',
      'Athletics': '🏃',
      'Cycling': '🚴',
      'Formula 1': '🏎️',
      'MotoGP': '🏍️',
      'Rally': '🚗',
      'Esports': '🎮'
    };
    
    return sportIcons[sport] || '🏆';
  }
} 