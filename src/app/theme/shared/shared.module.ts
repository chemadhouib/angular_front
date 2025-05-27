// angular import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// bootstrap import
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

// third party
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule, NgScrollbarModule, NgbCollapseModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule, NgScrollbarModule, NgbCollapseModule]
})
export class SharedModule {}
