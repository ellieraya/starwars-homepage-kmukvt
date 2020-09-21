import { Component, OnDestroy,  OnInit, ViewEncapsulation } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { HomepageService } from "./homepage.service";
import { CharacterDetails } from "./model/characterDetails.model";
import { FilmCharacterDetails } from "./model/filmCharacterDetails.model";
import { FilmDetails } from "./model/filmDetails.model";
import { UserData } from "./model/userData.model";

@Component({
  selector: "starwars-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HomepageComponent implements OnInit, OnDestroy {
  starwars: CharacterDetails[];

  characterdetails: UserData;

  filmDetailsList= [];

  filmCharactersDetails = [];

  activeSectionId: number;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private _homepageservice: HomepageService) {}

  ngOnInit() {
    this._homepageservice.getJSON().subscribe(data => {
      this.starwars = data.characters;
      console.log(this.starwars);
    });
  }
  /*
   * On click on character card
   */
  selectCharacter(characterDetailsUrl: string, sectionId) {
    this.activeSectionId = sectionId;
    this._homepageservice
      .getCharacterdetails(characterDetailsUrl)
      .pipe(takeUntil(this.destroy$))
      .subscribe(userDetails => {
        this.characterdetails = userDetails;
        this.getFilmList(userDetails.films);
      });
  }
  /*
   * get list of films from the selected character
   */
  getFilmList(filmsUrl) {
    this.filmDetailsList=[];
    filmsUrl.forEach(filmUrl => {
      this._homepageservice
        .getFilms(filmUrl)
        .pipe(takeUntil(this.destroy$))
        .subscribe((filmDetails: FilmDetails) => {
          this.filmDetailsList.push({name:filmDetails.title, date: filmDetails.release_date});
          this.getFilmcharacters(filmDetails.characters);
        });
    });
  }

  /*
   * get list of characters in the film
   */
  getFilmcharacters(characters) {
     this.filmCharactersDetails=[];
    characters.forEach(filmCharactersUrl => {
      this._homepageservice
        .getCharactersInFilms(filmCharactersUrl)
        .pipe(takeUntil(this.destroy$))
        .subscribe((filmCharactersDetails: FilmCharacterDetails) => {
          this.filmCharactersDetails.push(filmCharactersDetails.name);
        });
    });
  }

  ngOnDestroy() {
  }
}
