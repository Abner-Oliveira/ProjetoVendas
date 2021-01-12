import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormprodutoComponent } from './formproduto.component';

describe('FormprodutoComponent', () => {
  let component: FormprodutoComponent;
  let fixture: ComponentFixture<FormprodutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormprodutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormprodutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
