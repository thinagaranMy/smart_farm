import { IWaterConsumption } from 'app/shared/model/water-consumption.model';
import { WaterConsumptionService } from 'app/entities/water-consumption/water-consumption.service';
import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'jhi-water-consumption-by-area-graph',
  templateUrl: './water-consumption-by-area-graph.component.html',
  styleUrls: ['./water-consumption-by-area-graph.component.scss']
})
export class WaterConsumptionByAreaGraphComponent implements OnInit {

  
  
  constructor(
    protected waterConsumptionService: WaterConsumptionService) { 
      
    }
    startAnimationForLineChart(chart){
      let seq = 0;
      const delays = 80;
      const durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };

  ngOnInit() {
    let waterConsumptionArray : IWaterConsumption[];
    // eslint-disable-next-line no-console
    console.log('thina>>>>');
    // this.waterConsumptionService.findByArea(1).subscribe(res => {
    //   // eslint-disable-next-line no-console
    //   console.log(res.body);
    //   waterConsumptionArray = res.body;
    //    // eslint-disable-next-line no-console
    //   console.log(waterConsumptionArray);
    // });

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F'],
          series: [
            [10,20,30,15,20]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);

  }

  

}
