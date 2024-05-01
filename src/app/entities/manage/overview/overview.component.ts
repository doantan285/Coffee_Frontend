import {Component, OnInit} from '@angular/core';
import {OverviewServiceService} from "./overview-service.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit{
  dataOverview: any;
  loading = false;
  noData = false;
  constructor(private overviewService: OverviewServiceService) {
  }

  ngOnInit() {
    this.getChartRevenue()
  }

  getChartRevenue(): void {
    // this.overviewService.getChartRevenue().subscribe(
    //   res =>{
    //     this.dataOverview = res
    //     console.log(this.dataOverview)
    //   }
    // )
  }
  updateRow(event: any ): void {

  }

}
