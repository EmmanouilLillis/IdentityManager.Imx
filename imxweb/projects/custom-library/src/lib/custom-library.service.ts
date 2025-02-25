import { Injectable } from '@angular/core';
import { AppConfigService, AuthenticationService, ExtService, MenuItem, MenuService } from 'qbm';
import { CustomLibraryComponent } from './custom-library.component';
import { Route, Router } from '@angular/router';
import { MethodDescriptor, TimeZoneInfo } from 'imx-qbm-dbts';

interface reportingIdentities{
  FirstName: string;
  LastName: string;
  Email: string;
}


@Injectable({
  providedIn: 'root'
})
export class CustomLibraryService {
  public hasReportingIdentities: boolean = false;
  public ammountOfReportingIdentities: number;
  public responseOfUpdate: string;

  constructor( 
    private readonly extService: ExtService ,
    private readonly router: Router,
    private readonly menuService: MenuService,
    private readonly config: AppConfigService,
    private readonly authentication: AuthenticationService, 
  ) {
    //  Subscribe to session state changes
    this.authentication.onSessionResponse.subscribe({
      next: sessionState => {
        if (sessionState?.IsLoggedOut) {
          this.hasReportingIdentities = false;
        } else if (sessionState?.IsLoggedIn) {
          this.HasReportingIdentiies();
          this.setupMenu();
        }
      }
    });
  }

  public onInit(routes: Route[]): void{
    this.addRoutes(routes);
    this.extService.register('Dashboard-SmallTiles' , {instance: CustomLibraryComponent}) 
    //this.HasReportingIdentiies(); 
    //this.setupMenu(); 
  }  


  addRoutes(routes: Route[]){
    const config = this.router.config;
    routes.forEach(route =>{
      config.unshift(route);
    });
    this.router.resetConfig(config); 
  }

  private setupMenu(): void {
    this.menuService.addMenuFactories((preProps: string[], features: string[]) => {      
      if(this.hasReportingIdentities){
        const menu: MenuItem = {
          id: 'ROOT_CustomLibrary',
          title: '#LDS#Custom Library', 
          items: [
            {
              id: 'CL_EmployeesReportingToMe',
              route: 'employees-reporting-to-me-page',
              title: '#LDS#Employees Reporting To Me', 
            }
          ],
        };
      
        return menu;
      }
    });
  } 
  public async GetAmmountOfReportingIdentities(): Promise<number>{
    this.ammountOfReportingIdentities = await this.config.apiClient.processRequest<number>(this.GetAmountReportingIdentities());  
    return this.ammountOfReportingIdentities;
  }

  public async HasReportingIdentiies(): Promise<boolean>{
    let reportingIdentiesForcheck = await this.config.apiClient.processRequest<number>(this.GetAmountReportingIdentities());
    this.hasReportingIdentities = reportingIdentiesForcheck > 0; 
    return this.hasReportingIdentities;
  }

  public async ReportingIdentities(): Promise<any>{
      let reportingIdentitiesObject = await this.config.apiClient.processRequest<reportingIdentities>(this.GetReportingIdentities());      
      return reportingIdentitiesObject;
    }

  public async UpdateStuff(exdata: any): Promise<string>{
      this.responseOfUpdate = await this.config.apiClient.processRequest<string>(this.UpdateCustomPropertyAndExitDate(exdata));
      return this.responseOfUpdate;       
  }

    
  private GetReportingIdentities(): MethodDescriptor<void>{
    return{
      path: '/portal/exercise/getreportingidentities',
      parameters: [],
      method: 'GET',
      headers: {
        'imx-timezone': TimeZoneInfo.get()
      },
      credentials: 'include',
      observe: 'response',
      responseType: 'json'
    };
  }

  private GetAmountReportingIdentities(): MethodDescriptor<void>{
    return{
      path: '/portal/exercise/getamountreportingidentities',
      parameters: [],
      method: 'GET',
      headers: {
        'imx-timezone': TimeZoneInfo.get()
      },
      credentials: 'include',
      observe: 'response',
      responseType: 'json'
    };
  }

  private UpdateCustomPropertyAndExitDate(data: any): MethodDescriptor<string>{
    return{
      path: '/portal/exercise/updatecustompropertyandexitdate',
      parameters: [
        {
            name: 'data',
            value: data,
            in: 'body'
        }
      ],
      method: 'POST',
      headers: {
        'imx-timezone': TimeZoneInfo.get()
      },
      credentials: 'include',
      observe: 'response',
      responseType: 'json'
    };
  }

}
