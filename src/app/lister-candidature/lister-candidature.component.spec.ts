import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerCandidatureComponent } from './lister-candidature.component';

describe('ListerCandidatureComponent', () => {
  let component: ListerCandidatureComponent;
  let fixture: ComponentFixture<ListerCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListerCandidatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
