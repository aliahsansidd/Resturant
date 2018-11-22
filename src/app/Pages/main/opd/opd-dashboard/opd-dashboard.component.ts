import { Component, OnInit } from '@angular/core';
import { flexslider } from '../../../../../../node_modules/flexslider';
declare var $;
@Component({
  selector: 'app-opd-dashboard',
  templateUrl: './opd-dashboard.component.html',
  styleUrls: ['./opd-dashboard.component.css']
})
export class OpdDashboardComponent implements OnInit {
  ShowERInput = false;
  selected = false;
  selected1 = false;
  public barChartOptions: any = {
    // color01 = '#6384ee';
    // color02 = '#15d4be';
    // color03 = '#ff6262';
    // color04 = '#f0ad4e ';
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: false,
      text: 'Chart.js Combo Bar Line Chart',
    },
    legend: {
      display: false,
      labels: { fontColor: '#b7c8ff' }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#b7c8ff',
        },
        gridLines: {
          color: 'rgba(160,160,160,0.2)',
          zeroLineColor: 'rgba(160,160,160,0.1)'
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: '#b7c8ff'
        },
        gridLines: {
          color: 'rgba(160,160,160,0.2)',
          zeroLineColor: 'rgba(160,160,160,0.1)'
        }
      }]
    }
  };
  public barChartLabels: string[] = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  public barChartType: any = 'bar';
  public barChartLegend: any = true;
  public barChartData: any[] = [
    { data: [65, 49, 60, 80], label: 'Smart Card' },
    { data: [23, 41, 67], label: 'Lab  Test' },
    { data: [30, 40, 70], label: 'OPD' },
    { data: [40, 30, 20, 10], label: 'Panel' },
  ];
  constructor() { }

  ngOnInit() {
    $('.flexslider').flexslider({
      animation: 'slide',
      itemWidth: 240,
      controlNav: true
    });
    $('ol.flex-control-nav').remove()
  }
  appoint() {
    if (this.selected === true) {
      this.selected = false;
    } else if (this.selected === false) {
      this.selected = true;
    }
  }
  appoint1() {
    this.selected1 = true;
  }
}
