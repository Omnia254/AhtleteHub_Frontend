import { Component, OnInit, HostBinding } from '@angular/core';
import { CoachDto, PaginatedResult, SortingDirection, Gender, SearchCriteria, RateFilter, AgeFilter, PriceFilter, SortBy } from '../../../interfaces';
import { CoachesService } from '../../../services/ApIServices/coaches.service';
import { AthleteFavoriteService } from 'src/app/public/services/ApIServices/athlete-favorite.service';


@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss']
})
export class CoachesComponent implements OnInit {
  coaches: CoachDto[] = [];
  totalItemsCount = 0;
  totalPages = 0;
  itemsFrom = 0;
  itemsTo = 0;
  hasNextPage = false;
  hasPreviousPage = false;
  currentPage = 1;
  pageSize = 10;
  Gender = Gender;
  canAddToFavorite?:boolean;

  @HostBinding('class') dFlex = 'd-flex flex-column flex-grow-1';

  constructor(private coachService: CoachesService,
    private athleteFavoriteService: AthleteFavoriteService 

  ) {}

  ngOnInit(): void {
    this.getAllCoaches();
  }

  genderKeys = Object.entries(Gender)
  .filter(([key, value]) => isNaN(Number(key)))
  .map(([key, value]) => ({ key, value }));
  rateKeys = Object.entries(RateFilter)
  .filter(([key, value]) => isNaN(Number(key)))
  .map(([key, value]) => ({ key, value }));
  ageKeys = Object.entries(AgeFilter)
  .filter(([key, value]) => isNaN(Number(key)))
  .map(([key, value]) => ({ key, value }));
  priceKeys = Object.entries(PriceFilter)
  .filter(([key, value]) => isNaN(Number(key)))
  .map(([key, value]) => ({ key, value }));

  // Define initial filter criteria
  filterCriteria: SearchCriteria = {
    includeCoachesRatings: true,
    searchCritrea: '',
    genderFilterCritrea: undefined,
    rateFilterCritrea: undefined,
    ageFilterCritrea: undefined,
    priceFilterCritrea: undefined,
    pageSize: 6,
    pageNumber: 1,
    //sortByCritrea: SortBy.Price,
    sortingDirection: SortingDirection.Ascending,
  };
  getAllCoaches(queryParams: any = {}): void {
    const query = {
      ...this.filterCriteria,
      ...queryParams // Merge any additional query parameters
    };

    this.coachService.getAllCoaches(query).subscribe({
      next: (data: PaginatedResult<CoachDto>) => {
        setTimeout(()=>{
          this.coaches = data.items;
          this.totalItemsCount = data.totalItemsCount;
          this.totalPages = data.totalPages;
          this.itemsFrom = data.itemsFrom;
          this.itemsTo = data.itemsTo;
          this.hasNextPage = data.hasNextPage;
          this.hasPreviousPage = data.hasPreviousPage;
          this.currentPage = query.pageNumber; // Update current page
          this.filterCriteria = query; // Update the criteria with the latest state
        },500)
      },
      error: (err) => {
        console.error('Error fetching coaches', err);
      }
    });
  
  }

  updateSearchCriteria(searchValue: string): void {
    this.getAllCoaches({ searchCritrea: searchValue });
  }

  updateGenderFilter(event: Event): void {
    const gender = (event.target as HTMLSelectElement).value;
    this.getAllCoaches({ genderFilterCritrea: gender || undefined });
  }
  
  updateRateFilter(event: Event): void {
    const rate = (event.target as HTMLSelectElement).value;
    this.getAllCoaches({ rateFilterCritrea: rate || undefined });
  }
  
  updateAgeFilter(event: Event): void {
    const age = (event.target as HTMLSelectElement).value;
    this.getAllCoaches({ ageFilterCritrea: age || undefined });
  }
  
  updatePriceFilter(event: Event): void {
    const price = (event.target as HTMLSelectElement).value;
    this.getAllCoaches({ priceFilterCritrea: price || undefined });
  }
  
  goToPage(pageNumber: number): void {
    if (pageNumber > 0 && pageNumber <= this.totalPages) {
      this.getAllCoaches({ pageNumber });
    }
  }

  addToFavorite(coachId: number) {
    this.athleteFavoriteService.addToFavorite(coachId).subscribe({
      next: (data) => {
        
      //return data.canAddToFavourite;
      console.log(data);
      console.log('Coach added to favorites:', data);
      },
      error: (err) => {
        console.error('Failed to add coach to favorites:', err);
        // Handle error scenarios
      }
    });
  }
}
