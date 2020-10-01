import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocompComponent } from './socomp.component';

describe('SocompComponent', () => {
  let component: SocompComponent;
  let fixture: ComponentFixture<SocompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocompComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
