import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoaddataPage } from './loaddata.page';

describe('LoaddataPage', () => {
  let component: LoaddataPage;
  let fixture: ComponentFixture<LoaddataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaddataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoaddataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
