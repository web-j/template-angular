import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardChartComponent } from './dashboard-chart/dashboard-chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
