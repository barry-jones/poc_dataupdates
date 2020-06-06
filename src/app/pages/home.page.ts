import { Component, OnInit, Inject } from '@angular/core';
import { Content } from '../services/data.interfaces';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public content: Content;
  public isLoaded: boolean = false;

  constructor(private data: DataService) {
  }

  async ngOnInit() {
    this.content = await this.data.getContent();
    this.isLoaded = true;
  }
}
