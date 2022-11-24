import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {SensorDao, SensorTypeDao, SensorValueDao, StationDao} from "@interface-front/storage";
import {SensorValue} from "@interface-front/entity";
import {Sort} from '@angular/material/sort';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'interface-front-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class StatistiquesComponent {

  differentDao=["SensorDao","StationDao","SensorTypeDao","SensorValueDao"]
  lastData:Array<SensorValue>
  listAvg:Array<number>

  constructor(private sensorDao:SensorDao,
              private stationDao:StationDao,
              private sensorTypeDao:SensorTypeDao,
              private sensorValueDao:SensorValueDao,
              private scroller: ViewportScroller) {
    this.lastData=this.sensorValueDao.getLastData()
    this.listAvg=this.sensorValueDao.getAvg()
  }


  sortData(sort: Sort) {
    const data = this.lastData.slice();
    if (!sort.active || sort.direction === '') {
      this.lastData = data;
      return;
    }

    this.lastData = data.sort((a:SensorValue, b:SensorValue) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'numero':
          return compare(a.sensorId, b.sensorId, isAsc);
        case 'valeur':
          return compare(a.value, b.value, isAsc);
        case 'date':
          return compare(a.captureData.getTime(), b.captureData.getTime(), isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
