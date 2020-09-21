import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomepageComponent } from "./homepage.component";
import { HomepageService } from "./homepage.service";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { FilterPipe } from "./filtercharacters";

@NgModule({
  declarations: [HomepageComponent,FilterPipe],
  imports: [CommonModule, MatCardModule, MatExpansionModule],
  providers: [HomepageService],
  exports: [HomepageComponent],
  bootstrap: []
})
export class StarWarsHomepageModule {
  static rootComponent = HomepageComponent;
}
