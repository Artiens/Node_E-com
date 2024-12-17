import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-graph',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public options: any = {};  // Déclaration de l'option pour Highcharts

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Récupérer les données de l'API
    this.http.get<any[]>('/api/ventes').subscribe(
      (data) => {
        console.log('Données récupérées:', data); // Log des données pour vérifier
        this.prepareChartData(data);
        Highcharts.chart('container', this.options);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );

  }
  // Préparer les données pour le graphique
  prepareChartData(data: any[]): void {
    const categories: string[] = [];  // Déclaration explicite comme tableau de chaînes
    const seriesData: number[] = [];  // Déclaration explicite comme tableau de nombres

    // Calculer la somme des ventes par date
    data.forEach(vente => {
      const date = new Date(vente.date);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`; // Format dd/mm
      const somme = vente.somme;

      // Ajouter la somme à la catégorie correspondante
      if (categories.includes(formattedDate)) {
        const index = categories.indexOf(formattedDate);
        seriesData[index] += somme;  // Additionner les ventes pour la même date
      } else {
        categories.push(formattedDate);
        seriesData.push(somme);  // Ajouter une nouvelle entrée pour une nouvelle date
      }
    });

    // Configurer les options de Highcharts
    this.options = {
      chart: {
        type: 'line',  // Utiliser un graphique en ligne
        height: 700
      },
      title: {
        text: 'Total des ventes par date'
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
          text: 'Somme des ventes'
        }
      },
      series: [{
        name: 'Ventes',
        data: seriesData  // Sommes des ventes pour chaque date
      }]
    };
  }
}
