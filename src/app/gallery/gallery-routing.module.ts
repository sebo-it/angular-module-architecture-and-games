import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery.component';

const galleryRoutes: Routes = [
  { path: 'gallery', component: GalleryComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(galleryRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class GalleryRoutingModule { }
