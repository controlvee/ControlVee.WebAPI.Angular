import { Component } from '@angular/core';
import { BatchService } from './services/get-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [BatchService]
})
export class AppComponent {
  title = 'ClientApp';
}
