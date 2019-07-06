import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  isLoading: boolean;
  p: number = 1;
  query;
  noResults: boolean;
  images;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onSearch("photos");
  }

  onSearch(query) {
    this.isLoading = true;
    const URL = `https://pixabay.com/api/?key=${
      environment.PIXABAY_API_KEY
    }&q=${query}&per_page=200&page=1&safesearch=true`;
    console.log(query);
    this.images = this.http.get(URL).pipe(
      map((data: any) => {
        if (data.total === 0) {
          this.noResults = true;
        } else {
          this.noResults = false;
        }
        console.log(data);
        this.isLoading = false;
        return data.hits;
      })
    );
    this.p = 1;
    return this.images;
  }
}
