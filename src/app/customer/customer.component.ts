import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../features/auth/services/auth.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }
  
  username: string = '';
  id: number | null = null; 
  // Şikayet formu için veri modeli
  feedbackContent: string = '';
  feedbackType: string = 'Neutral';  // Varsayılan olarak Nötr

  // Modal ve bildirim gösterme kontrol değişkenleri
  isModalVisible: boolean = false;
  isNotificationVisible: boolean = false;
  notificationMessage: string = '';

  notifications: any[] = [];

  games: any[] = [];  // Array to hold the games data
  isPlayerModalVisible: boolean = false;  // Modal visibility flag

  recommendedGames: any[] = [];  // Array to hold recommended games
  isRecommendationModalVisible: boolean = false;  // Modal visibility flag

  isGamesModalVisible: boolean = false;  // Modal visibility flag
  ratings: { [key: number]: number } = {};  // Stores ratings for each game by game ID
  ratingsArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];  // Rating options
  playerId: number = 1;  // Example player ID (you can get this dynamically based on the logged-in player)


  async ngOnInit() {
    // AuthService üzerinden kullanıcı adını set et
    this.username = this.authService.getUser() ?? ''; // AuthService'deki kullanıcı bilgilerini alın
    this.id = this.authService.getId() ?? null;
    this.ratings = Array.from({ length: 10 }, (_, i) => i + 1);
  }

  // Fetch recommended games for the player
  Recommendation(): void {
    const formData = new FormData();
    formData.append('id', this.id!.toString());

    this.http.post<any[]>(`${environment.baseUrlMaster}/Player/ListRecommendedGames`, formData).subscribe({
      next: response => {
        if (response) {
          console.log("recomm: ",response);
          this.recommendedGames = response.slice(0, 3);  // Get the top 3 recommended games
          this.openRecommendationModal();  // Open the modal to display the games
        } else {
          alert('No recommended games found');
        }
      },
      error: error => {
        console.error('Error fetching recommended games:', error);
        alert('Error fetching recommended games');
      }
    });
  }

  async myPoints(){
    const formData = new FormData();
    formData.append('id', this.id!.toString());
    this.http.post<any>(`${environment.baseUrlMaster}/Player/ListPlayedGames`, formData)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.games = response;  // Assign the fetched games data to the games array
          this.openPlayerModal();  // Open the modal once data is fetched
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  // Şikayet gönderme fonksiyonu
  async submitFeedback() {
    const formData = new FormData();
    formData.append('id', this.id!.toString());
    formData.append('feedbackType', this.feedbackType);
    formData.append('feedbackContent', this.feedbackContent);
    console.log(formData);
    this.http.post<any>(`${environment.baseUrlMaster}/Player/SubmitFeedback`, formData).subscribe({
      next: response => { 
          alert('Form successfully sent');
          this.feedbackContent = '';  // Formu temizle
          this.feedbackType = 'Neutral';  // Şikayet türünü varsayılan yap
      },
      error: error => {
        // Hata durumu
        console.error(error);
        alert('Form sending failed');
      },
      complete: () => {
        // Tamamlanma durumu (Opsiyonel)
      }
    });

    this.feedbackContent = '';  // Formu temizle
    this.feedbackType = 'Neutral';  // Şikayet türünü varsayılan yap
  }
 
  async fetchNotifications() {
    const formData = new FormData();
    formData.append('id', this.id!.toString());
    this.http.post<any>(`${environment.baseUrlMaster}/Player/ListNotifications`, formData).subscribe({
      next: response => {
        this.notifications = response; // Bildirimleri al ve kaydet
        this.openNotificationModal(); // Modalı aç
        console.log(response);
      },
      error: error => {
        console.error(error);
        alert('Failed to fetch notifications');
      }
    });
  }

  // Fetch all games (simulated)
  fetchGames(): void {
    this.http.get<any[]>(`${environment.baseUrlMaster}/Player/GetGames`).subscribe({
      next: response => {
        console.log(response);
        this.games = response;
        // Initialize ratings object with default values (0) for each game
        this.games.forEach(game => {
          this.ratings[game.id] = 0;  // Default to 0 rating for each game
        });
      },
      error: error => {
        console.error('Error fetching games:', error);
        alert('Error fetching games');
      }
    });
  }

  submitRatings(): void {
    // Filter out the games with rating 0 (so we don't send them to the backend)
    const ratingsData = this.games
      .filter(game => this.ratings[game.id] > 0)  // Only include games with a rating greater than 0
      .map(game => ({
        gameId: game.id,
        score: this.ratings[game.id],  // Get the rating from the 'ratings' object
        id: this.playerId
      }));
      console.log("Data:",ratingsData);


    if (ratingsData.length === 0) {
      alert('Please rate at least one game.');
      return;  // Do not submit if no valid ratings
    }

    // Submit ratings for the filtered games
    ratingsData.forEach(rating => {
      this.submitGameScore(rating);
    });
  }

  submitGameScore(ratingData: { gameId: number, score: number, id: number }): void {
    const formData = new FormData();
    formData.append('id', this.id!.toString());
    formData.append('gameId', ratingData.gameId.toString());
    formData.append('score', ratingData.score.toString());
    console.log("FormData:",formData);

    this.http.post<any>(`${environment.baseUrlMaster}/Player/SubmitGameScore`, formData).subscribe({
      next: response => {
        console.log('Game rated successfully');
      },
      error: error => {
        console.error('Error rating game:', error);
        alert('Error rating game');
      }
    });
  }

  // Modal açma ve kapama fonksiyonları
  openNotificationModal(): void {
    this.isModalVisible = true;
  }

  closeNotificationModal(): void {
    this.isModalVisible = false;
  }

  // Open the modal to display the games
  openPlayerModal(): void {
    this.isModalVisible = false;
    this.isPlayerModalVisible = true;
  }

  // Close the modal
  closePlayerModal(): void {
    this.isPlayerModalVisible = false;
  }

    // Open the recommendation modal
    openRecommendationModal(): void {
      this.isRecommendationModalVisible = true;
    }
  
    // Close the recommendation modal
    closeRecommendationModal(): void {
      this.isRecommendationModalVisible = false;
    }

      // Open the modal to display all games
  openGamesModal(): void {
    this.fetchGames();  // Fetch games when the modal is opened
    this.isGamesModalVisible = true;
  }

  // Close the modal
  closeGamesModal(): void {
    this.isGamesModalVisible = false;
  }


    logout(){
      this.router.navigate(['/login'])
    }

}
