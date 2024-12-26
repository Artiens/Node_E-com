import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-graph',
  templateUrl: './chart.component.html',
  standalone: true,
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public options: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('/api/ventes').subscribe(
      (data) => {
        console.log('Data recovered:', data);
        this.prepareChartData(data);
        Highcharts.chart('container', this.options);
      },
      (error) => {
        console.error('Error retrieving data:', error);
      }
    );

  }
  // Préparer les données pour le graphique
  prepareChartData(data: any[]): void {
    const categories: string[] = [];  // Explicit declaration as array of strings
    const seriesData: number[] = [];  // Explicit declaration as array of numbers

    // Calculer la somme des ventes par date
    data.forEach(vente => {
      const date = new Date(vente.date);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`; // Format dd/mm
      const somme = vente.somme;

      // Add the amount to the corresponding category
      if (categories.includes(formattedDate)) {
        const index = categories.indexOf(formattedDate);
        seriesData[index] += somme;  // Add the amount to the corresponding category
      } else {
        categories.push(formattedDate);
        seriesData.push(somme);  // Add a new entry for a new date
      }
    });

    // Configure Highcharts options
    this.options = {
      chart: {
        type: 'line',  // Use an online chart
        height: 700
      },
      title: {
        text: 'Total sales by date'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: categories,  // Dates
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Total sales'
        }
      },
      series: [{
        name: 'Sales',
        data: seriesData  // Sales sums for each date
      }]
    };
  }
}
