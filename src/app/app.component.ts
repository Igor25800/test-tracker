import { Component } from '@angular/core';
import {MoneyTrackerComponent} from './pages/money-tracker/money-tracker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    MoneyTrackerComponent
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
