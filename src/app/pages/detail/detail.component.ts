import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { ChartComponent } from '../../components/chart/chart.component';
import { DataTableService } from '../../components/data-table/data-table.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataTableRow } from '../../components/data-table/data-table-row.interface';
import { ChartInterface } from '../../components/chart/chart.interface';
import { localTZ } from '../../shared/helpers/timezone';
import { InternalizationPipe } from '../../shared/pipes/i18n.pipe';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    FontAwesomeModule,
    DataTableComponent,
    ChartComponent,
    InternalizationPipe
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  returnIcon = faArrowLeft;

  dataSource = new MatTableDataSource<DataTableRow>();

  tempGraphData: ChartInterface = {
    xAxis: [],
    yAxis: []
  };

  networkStrengthGraphData: ChartInterface = {
    xAxis: [],
    yAxis: []
  };

  constructor(
    private router: Router,
    private dataTableService: DataTableService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const targetCity: string | null = params.get('city');
      console.log(`Get data from city ${targetCity}`);

      if(targetCity) {
        this.dataSource = this.dataTableService.getDataRowsByCity(targetCity);
        
        this.dataSource.data.forEach((data: DataTableRow) => {
          this.tempGraphData.xAxis.push(localTZ(data.insert_date));
          this.tempGraphData.yAxis.push(data.temp);

          this.networkStrengthGraphData.xAxis.push(localTZ(data.insert_date));
          this.networkStrengthGraphData.yAxis.push(`${data.network_strength}`);
        });
      }
    }); 
  }

  return(): void{
    this.router.navigate(['/']);
  }
}
