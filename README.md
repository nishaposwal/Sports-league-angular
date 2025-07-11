# Sports Leagues - Netflix Style Angular App

A modern, responsive Angular application that displays sports leagues in a Netflix-inspired interface. Built with Angular 17, TypeScript, and SCSS.

## 🌐 Live Demo
**[View Live Application](https://sports-league-angular.web.app)**

## 📁 Repository
**[GitHub Repository](https://github.com/nishaposwal/Sports-league-angular.git)**

## ✨ Features

### 🏆 League Display
- **Grid Layout**: Netflix-style card grid displaying all sports leagues
- **League Information**: Shows league name, alternate name, and sport type
- **Sport Icons**: Visual representation of different sports with emoji icons
- **Season Badges**: Displays league season badges from the API (with fallback icons)

### 🔍 Search & Filter
- **Real-time Search**: Search leagues by name or alternate name
- **Sport Filter**: Dropdown to filter leagues by sport type (Soccer, Basketball, etc.)
- **Clear Filters**: Easy reset functionality for all filters
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 🎨 Netflix-Style UI
- **Dark Theme**: Netflix-inspired dark color scheme
- **Hover Effects**: Smooth animations and hover states
- **Card Design**: Modern card layout with gradients and shadows
- **Loading States**: Elegant loading spinners and error handling
- **Responsive Grid**: Adaptive grid layout for different screen sizes

### ⚡ Performance & Caching
- **API Caching**: Intelligent caching of league data and season badges
- **Optimized Loading**: Efficient data fetching with RxJS
- **Error Handling**: Graceful error states with retry functionality
- **TrackBy Functions**: Optimized rendering with proper trackBy implementations

## 🛠️ Technology Stack

### Frontend Framework
- **Angular 17**: Latest version with standalone components
- **TypeScript**: Type-safe development
- **SCSS**: Advanced styling with variables and mixins

### State Management & Data
- **RxJS**: Reactive programming for data streams
- **HTTP Client**: Angular's HttpClient for API communication
- **Observables**: Reactive data handling throughout the app

### Styling & UI
- **Netflix-Inspired Design**: Dark theme with red accent colors
- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Animations**: Smooth transitions and hover effects
- **Responsive Design**: Mobile-first approach

### APIs & External Services
- **TheSportsDB API**: 
  - All Leagues: `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
  - Season Badges: `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id={leagueId}`

## 📁 Project Structure

```
src/app/
├── components/
│   ├── league-card/          # Individual league card component
│   ├── leagues-grid/         # Main grid container
│   └── search-filter/        # Search and filter controls
├── services/
│   └── sports-api.service.ts # API service with caching
├── models/
│   └── league.interface.ts   # TypeScript interfaces
└── app.component.*           # Main app component
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nishaposwal/Sports-league-angular.git
   cd Sports-league-angular
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

## 🏗️ Build & Deployment

### Development Build
```bash
ng serve
```

### Production Build
```bash
ng build --configuration production
```

### Running Tests
```bash
ng test
```

## 🎯 Key Components

### LeagueCardComponent
- Displays individual league information
- Handles season badge loading with caching
- Responsive card design with hover effects
- Sport icon mapping for visual representation

### LeaguesGridComponent
- Main container for all league cards
- Handles search and filter logic
- Manages loading and error states
- Responsive grid layout

### SearchFilterComponent
- Real-time search functionality
- Sport type filtering
- Clear filters functionality
- Dynamic sport options loading

### SportsApiService
- HTTP client for API communication
- Intelligent caching for performance
- Error handling and retry logic
- Observable-based data streams

## 🎨 Design Features

### Color Scheme
- **Primary Red**: `#e50914` (Netflix red)
- **Dark Background**: `#0a0a0a` to `#1a1a1a`
- **Card Background**: `#1a1a1a` to `#2d2d2d`
- **Text Colors**: White and light gray variants

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700
- **Responsive Sizing**: Adaptive font sizes for different screens

### Animations
- **Hover Effects**: Scale and shadow transitions
- **Loading Spinners**: Custom CSS animations
- **Smooth Transitions**: 0.3s cubic-bezier transitions

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px

## 🔧 Configuration

### Angular Configuration
- **Standalone Components**: Modern Angular architecture
- **HTTP Client**: Configured in app.config.ts
- **Routing**: Basic routing setup (expandable)

### API Configuration
- **Base URL**: TheSportsDB API v1
- **Caching Strategy**: RxJS shareReplay for performance
- **Error Handling**: Comprehensive error states

## 🚀 Deployment

The application is deployed on Firebase Hosting and can be accessed at:
**[https://sports-league-angular.web.app](https://sports-league-angular.web.app)**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **TheSportsDB**: For providing the sports data API
- **Angular Team**: For the amazing framework
- **Netflix**: Design inspiration for the UI/UX

---

**Built with ❤️ using Angular 17** 