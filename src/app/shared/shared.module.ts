import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeBtnComponent } from './like-btn/like-btn.component';
import { NavBtnComponent } from './nav-btn/nav-btn.component';



@NgModule({
  declarations: [
    LikeBtnComponent,
    NavBtnComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [LikeBtnComponent,NavBtnComponent]
})
export class SharedModule { }
