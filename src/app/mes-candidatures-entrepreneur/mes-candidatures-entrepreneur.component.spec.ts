import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesCandidaturesEntrepreneurComponent } from './mes-candidatures-entrepreneur.component';

describe('MesCandidaturesEntrepreneurComponent', () => {
  let component: MesCandidaturesEntrepreneurComponent;
  let fixture: ComponentFixture<MesCandidaturesEntrepreneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesCandidaturesEntrepreneurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesCandidaturesEntrepreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
