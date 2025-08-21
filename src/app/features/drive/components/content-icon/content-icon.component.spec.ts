import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentIconComponent } from './content-icon.component';

describe('ContentIconComponent', () => {
  let component: ContentIconComponent;
  let fixture: ComponentFixture<ContentIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
