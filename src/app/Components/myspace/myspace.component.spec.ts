import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyspaceComponent } from './myspace.component';

describe('MyspaceComponent', () => {
  let component: MyspaceComponent;
  let fixture: ComponentFixture<MyspaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyspaceComponent]
    });
    fixture = TestBed.createComponent(MyspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
