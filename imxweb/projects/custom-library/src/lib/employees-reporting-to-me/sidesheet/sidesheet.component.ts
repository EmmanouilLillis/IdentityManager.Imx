import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EUI_SIDESHEET_DATA, EuiSidesheetRef,} from '@elemental-ui/core';
import { CustomLibraryService } from '../../custom-library.service';
import { DateAdapter } from '@angular/material/core';
interface UpdateData{
  Email: string,
  CustomProperty: string,
  ExitDate: string
}

@Component({
  selector: 'imx-sidesheet',
  templateUrl: './sidesheet.component.html',
  styleUrls: ['./sidesheet.component.scss']
})
export class SidesheetComponent implements OnInit {
  public inputValue: string = '';
  public isError: boolean = false;
  public alertMsg: string;
  public response: string ='';
  public loading: boolean = false;
  public updateData: UpdateData = {
    Email: '',
    CustomProperty: '',
    ExitDate: ''
  };
  date2 = new FormControl(); // For the date picker

  constructor(
    @Inject(EUI_SIDESHEET_DATA) public sidesheetdata?: any,
    private readonly customLibraryService?: CustomLibraryService,
    private readonly sidesheetRef ?: EuiSidesheetRef,
    private readonly dateAdapter?: DateAdapter<any>

  ) {}

  ngOnInit(): void {

  }

  public async  ApplyUpdates(): Promise<void> {
    if (!this.inputValue) {
      this.alertMsg  = 'Please fill the Custom Property !';
      this.isError = true;
      return;
    }
    
     const selectedDate = this.date2.value.format('YYYY-MM-DD HH:mm:ss.SSS')
     const today = new Date();
     today.setHours(0, 0, 0, 0); // Reset time to midnight

    if (new Date(selectedDate) < today ) {
      this.alertMsg = 'Please Select a valid date!';
      this.isError = true;
      return;
    }

    
  
    // If all checks pass, proceed with your logic
    console.log('Proceeding with:', selectedDate, this.inputValue);
  
    this.updateData = {
      Email: this.sidesheetdata?.Email,
      CustomProperty: this.inputValue,
      ExitDate: selectedDate.toString()
    };

    this.loading = true;
    let response = await this.customLibraryService.UpdateStuff(this.updateData);

    if (response === 'Update Successfull') {
      this.sidesheetRef.close('Update Successfull');
      this.loading= false;
    } else {
      this.loading = false;
      this.alertMsg = 'Update failed!';
      this.isError = true;
    }

    this.inputValue = '';
    this.date2.setValue(null);

  }

  public CloseAlert(){
    this.isError = false;
  }
  
}
