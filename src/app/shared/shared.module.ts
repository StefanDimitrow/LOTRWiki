import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeBtnComponent } from './like-btn/like-btn.component';




@NgModule({
  declarations: [
    LikeBtnComponent,
    
  ],
  imports: [
    CommonModule
  ],
  exports: [LikeBtnComponent,]
})
export class SharedModule { }
