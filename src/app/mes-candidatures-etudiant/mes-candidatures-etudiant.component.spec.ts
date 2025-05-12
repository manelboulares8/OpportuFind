import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesCandidaturesEtudiantComponent } from './mes-candidatures-etudiant.component';

describe('MesCandidaturesEtudiantComponent', () => {
  let component: MesCandidaturesEtudiantComponent;
  let fixture: ComponentFixture<MesCandidaturesEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesCandidaturesEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesCandidaturesEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
