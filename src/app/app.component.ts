import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaguesGridComponent } from './components/leagues-grid/leagues-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LeaguesGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sports-leagues-app';
} 

