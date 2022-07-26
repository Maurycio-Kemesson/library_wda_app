/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookloanComponent } from './bookloan.component';

describe('BookloanComponent', () => {
  let component: BookloanComponent;
  let fixture: ComponentFixture<BookloanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookloanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
