import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EUI_SIDESHEET_DATA, EuiSidesheetRef,} from '@elemental-ui/core';
import moment from 'moment';
import { CustomLibraryService } from '../../custom-library.service';
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
  date2 = new FormControl(''); // For the date picker

  constructor(
    @Inject(EUI_SIDESHEET_DATA) public sidesheetdata?: any,
    private readonly customLibraryService?: CustomLibraryService,
    private readonly sidesheetRef ?: EuiSidesheetRef

  ) {}

  ngOnInit(): void {

  }

  public async  ApplyUpdates(): Promise<void> {
    if (!this.inputValue) {
      this.alertMsg  = 'Please fill the Custom Property !';
      this.isError = true;
      return;
    }
    const selectedDate = moment(this.date2.value);
    const today = moment().startOf('day'); 
    if (selectedDate.isBefore(today, 'day') || !selectedDate.isValid()) {
      this.alertMsg  = 'Please Select a valid date !';
      this.isError = true;
      return;
    }
  
    // If all checks pass, proceed with your logic
    const formattedDate = selectedDate.format('YYYY-MM-DD HH:mm:ss.SSS');
    console.log('Proceeding with:', formattedDate, this.inputValue);
  
    this.updateData = {
      Email: this.sidesheetdata?.Email,
      CustomProperty: this.inputValue,
      ExitDate: formattedDate
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
