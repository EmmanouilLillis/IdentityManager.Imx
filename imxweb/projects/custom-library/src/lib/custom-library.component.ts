import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { CustomLibraryService } from './custom-library.service';

@Component({
  selector: 'imx-custom-library',
  templateUrl: './custom-library.component.html',
  styles: [
  ]
})
export class CustomLibraryComponent implements OnInit {
  caption: string = "My emmployees";
  public hasReportingIdentities: boolean;
  public amntReportingIdentities: number;

  routes: Routes = [
  ];

  constructor(
    public readonly router : Router,
    private readonly customLibraryService: CustomLibraryService,
  ) { }

  async ngOnInit(): Promise<void> {
    console.log("CustomLibraryComponent-> onInit"); 
    this.hasReportingIdentities = await this.customLibraryService.HasReportingIdentiies();//Check if identity has reporting identities
    this.amntReportingIdentities = await this.customLibraryService.GetAmmountOfReportingIdentities();// get ammount of identities 
  }

  public GoToEmployeesReportingToMeCCC(): void {
    this.router.navigate(['employees-reporting-to-me-page'])
  }
}
