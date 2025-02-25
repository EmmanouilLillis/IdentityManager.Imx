import { NgModule } from '@angular/core';
import { CustomLibraryComponent } from './custom-library.component';
import { CustomLibraryService } from './custom-library.service';
import { TilesModule } from 'qer';
import { EmployeesReportingToMeComponent } from './employees-reporting-to-me/employees-reporting-to-me.component';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from 'qbm';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EuiCoreModule} from '@elemental-ui/core';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SidesheetComponent } from './employees-reporting-to-me/sidesheet/sidesheet.component';
import { FormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const routes: Routes = [
  { 
    path: 'employees-reporting-to-me-page', 
    component: EmployeesReportingToMeComponent,
    canActivate: [RouteGuardService],
    resolve: [RouteGuardService]
  },
];

export const EUI_DATE_FORMATS = {
  parse: {
    dateInput: ['LL', 'L'],
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const EuiDateProviders = [
  { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: EUI_DATE_FORMATS },
];

@NgModule({
  declarations: [
    CustomLibraryComponent,
    EmployeesReportingToMeComponent,
    InfoDialogComponent,
    SidesheetComponent,
  ],
  imports: [
    TilesModule,
    RouterModule,
    RouterModule.forChild(routes),
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    EuiCoreModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CustomLibraryComponent
  ],
  providers: [
      RouteGuardService,
      ...EuiDateProviders
  ]
})
export class CustomLibraryModule { 
  constructor(
    private readonly initializer: CustomLibraryService) {
    console.log( '🔥 CustomLibrary loaded');
    this.initializer.onInit(routes);
    console.log( '▶️ CustomLibrary initialized');
  }
}
