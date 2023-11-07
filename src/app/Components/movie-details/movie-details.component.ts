import {Component, Input} from '@angular/core';
import {Movies} from "../../Model/movie";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  @Input() movie : Movies | undefined

}
