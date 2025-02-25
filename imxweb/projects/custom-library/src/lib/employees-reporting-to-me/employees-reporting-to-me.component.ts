import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CustomLibraryService } from '../custom-library.service';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EuiSidesheetConfig, EuiSidesheetService } from '@elemental-ui/core';
import { SidesheetComponent } from './sidesheet/sidesheet.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface reportingIdentities {
  FirstName: string;
  LastName: string;
  Email: string;
}

@Component({
  selector: 'imx-employees-reporting-to-me',
  templateUrl: './employees-reporting-to-me.component.html',
  styleUrls: ['./employees-reporting-to-me.component.scss']
})
export class EmployeesReportingToMeComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<reportingIdentities>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private readonly customLibraryService: CustomLibraryService,
    private dialog: MatDialog,
    private router: Router,
    private sidesheetService: EuiSidesheetService,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit(): Promise<void> {
    this.dataSource.data = await this.customLibraryService.ReportingIdentities();
  
    if (this.dataSource.data.length === 0) {
      this.router.navigate(['/dashboard']);// Redirect if no data
      setTimeout(() => {
        window.location.reload(); // Refresh after redirect
      }, 100); 
      return;
    }
  
    this.displayedColumns = Object.keys(this.dataSource.data[0]); // Avoid errors on empty data
    this.dataSource.paginator = this.paginator;
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openDialog(){
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '400px'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed', result);
    });
  }

  public GoToSideSheet(data: any): void {
    const config: EuiSidesheetConfig = {
      title: data.FirstName +' '+ data.LastName + "'s Details",
      closeAriaLabel: 'Close first sidesheet',
      testId: 'eui-sidesheet-1',
      data: data,
      width: '600px',
    };
    
    const sidesheetRef = this.sidesheetService.open(SidesheetComponent, config);
  
    sidesheetRef.afterClosed().subscribe((val: string) => {
      if (val === 'Update Successfull') {
        this.openSnackBar(val , 'Close')
      }
    });
  }

  public openSnackBar(message: string , action: string){
    this.snackBar.open(message, action);
  }
  
}

