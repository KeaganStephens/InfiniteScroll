import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrolComponent } from './infinite-scrol.component';

describe('InfiniteScrolComponent', () => {
  let component: InfiniteScrolComponent;
  let fixture: ComponentFixture<InfiniteScrolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfiniteScrolComponent]
    });
    fixture = TestBed.createComponent(InfiniteScrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
