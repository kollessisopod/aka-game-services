import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Doğru yolu ayarlayın
import { AuthService } from '../features/auth/services/auth.service'; // AuthService'yi doğru import edin
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  username: string = '';  // Kullanıcı adı
  id: number | null = null;  // Çalışan ID'si
  notificationContent: string = '';  // Bildirim içeriği
  notifications: any[] = [];  // Bildirimler için array

  campaignInfo: string = '';  // Kampanya bilgisi
  hasReward: boolean = false;  // Ödül durumu
  rewardInfo: string = '';  // Ödül bilgisi

  isTopGamesModalVisible: boolean = false;
  topGames: any[] = []; // Array to store the top games

  isPositivityGamesModalVisible: boolean = false;
  positiveGames: any[] = []; // Array to store the top positive games

  positive_rating: number | null = null;
  neutral_rating: number | null = null;
  negative_rating: number | null = null;



  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    // AuthService üzerinden kullanıcı bilgilerini al
    this.username = this.authService.getUser() ?? ''; 
    this.id = this.authService.getId() ?? null;
  }

  // Bildirim gönderme fonksiyonu
  submitNotification(): void {
    if (this.notificationContent.trim() === '') {
      alert('Notification content cannot be empty!');
      return;
    }

    const formData = new FormData();
    formData.append('content', this.notificationContent);

    this.http.post<any>(`${environment.baseUrlMaster}/Employee/SendNotificationToAll`, formData).subscribe({
      next: response => {
        console.log(response); // API yanıtını kontrol edin
        if (response && response.success) {  // Yanıtın 'success' özelliği kontrol edilebilir
          alert('Notification successfully sent');
          this.notificationContent = '';  // Formu temizle
        } else {
          alert('Error while sending notification: ' + (response.message || 'Unknown error'));
        }
      },
      error: error => {
        console.error(error);
        alert('Error while sending notification');
      }
    });
  }
  submitCampaign(): void {
    if (this.campaignInfo.trim() === '') {
      alert('Campaign information cannot be empty!');
      return;
    }

    const formData = new FormData();
    formData.append('campaignInfo', this.campaignInfo);
    formData.append('hasReward', this.hasReward.toString());
    formData.append('rewardInfo', this.rewardInfo);

    // Kampanya oluşturma API çağrısı
    this.http.post<any>(`${environment.baseUrlMaster}/Employee/CreateCampaign`, formData).subscribe({
      next: response => {
        alert('Campaign created successfully');
        // Kampanya bilgilerini sıfırlayın
        this.campaignInfo = '';
        this.hasReward = false;
        this.rewardInfo = '';
      },
      error: error => {
        console.error('Error:', error);
        alert('Error while creating campaign');
      }
    });
  }

  fetchPositivityGames(): void {
    this.http.get<any>(`${environment.baseUrlMaster}/Employee/GetTopTenGamesByPositivity`).subscribe({
      next: response => {
        
        this.positiveGames = response;
      },
      error: (error) => {
        console.error('Error fetching positive games:', error);
        alert('Failed to fetch positive games');
      }
    });
  }
  logout(){
    this.router.navigate(['/login'])
  }

  openGamesModal(): void {
    this.isTopGamesModalVisible = true;
    this.fetchTopGames();
  }

  closeGamesModal(): void {
    this.isTopGamesModalVisible = false;
  }

  openPositivityGamesModal(): void {
    this.isPositivityGamesModalVisible = true;
    this.fetchPositivityGames();
  }

  closePositivityGamesModal(): void {
    this.isPositivityGamesModalVisible = false;
  }

  fetchTopGames(): void {
    const url = `${environment.baseUrlMaster}/Employee/GetTopTenGamesByPopularity`;
    this.http.get<any[]>(url).subscribe({
      next: (response) => {
        this.topGames = response;
      },
      error: (error) => {
        console.error('Error fetching top games:', error);
        alert('Failed to fetch top games');
      }
    });
  }

  fetchPercentage() {
    const url = `${environment.baseUrlMaster}/Employee/GetFeedbackTypePercentages`;
    this.http.get<any>(url).subscribe({
      next: (response) => {
        console.log(response);
  
        // Assuming the response is an array of feedback types, extract the relevant data
        const positive = response.find((item: any) => item.fType === 'Positive');
        const neutral = response.find((item: any) => item.fType === 'Neutral');
        const negative = response.find((item: any) => item.fType === 'Negative');
  
        // Assign the values to the component properties
        this.positive_rating = positive ? positive.fPercentage : 0;
        this.neutral_rating = neutral ? neutral.fPercentage : 0;
        this.negative_rating = negative ? negative.fPercentage : 0;
      },
      error: (error) => {
        console.error('Error fetching feedback percentages:', error);
        alert('Failed to fetch feedback percentages');
      }
    });
  }
  
}
