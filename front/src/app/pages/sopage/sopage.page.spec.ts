import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SopagePage } from './sopage.page';

describe('SopagePage', () => {
  let component: SopagePage;
  let fixture: ComponentFixture<SopagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SopagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SopagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
