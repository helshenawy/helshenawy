import { Component, OnInit } from '@angular/core';
import { PhoneCountry } from '../model/phone-country.model';
import { CustomerServiceService } from '../service/customer-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  phoneList:PhoneCountry[] =[];
  resultPhoneList:PhoneCountry[] =[];
    countries = [
          { name:"Cameroon", value:'[(]237[)]\\s?[2368]\\d{7,8}' },
          { name:"Ethiopia", value:'[(]251[)]\\s?[1-59]\\d{8}'  },
          { name:"Morocco", value:'[(]212[)]\\s?[5-9]\\d{8}'  },
          { name:"Mozambique", value:"[(]258[)]\\s?[28]\\d{7,8}"  },
          { name:"Uganda", value:"[(]256[)]\\s?\\d{9}"  }
        ];
 searchedCountries :any;

  constructor(private customerServiceService :CustomerServiceService) { }

  ngOnInit(): void {
    this.loadCustomerPhones();
  }

    checkValidPhone(phone:any):any{
      var regex = /[(][0-9]{1,3}[)]\s?[2368]\d{7,8}|[(][0-9]{1,3}[)]\s?[1-59]\d{8}|[(][0-9]{1,3}[)]\s?[5-9]\d{8} |[(][0-9]{1,3}[)]\s?[28]\d{7,8}|[(][0-9]{1,3}[)]\s?\d{9}/;
      return regex.test(phone);
    }  

    searchCountry(search: any) {
      
      var country = search.target.value;
      if(country.length==0){
        this.loadCustomerPhones();
      }
      this.searchedCountries = this.countries.filter(function (str) { return str.name.toLowerCase().includes(country.toLowerCase()) });
     
      if(this.searchedCountries.length==0){
        this.resultPhoneList =  [];
      }else{
        
        var regex ='';
        for(var i =0 ; i<this.searchedCountries.length ;i++ ){
          regex += this.searchedCountries[i].value  ;
          var index= i+1;
          if(index<this.searchedCountries.length){
            regex += '|';
          }
        }
        var re = new RegExp(regex);
         this.resultPhoneList = this.phoneList.filter(function (phoneObject) { return phoneObject.phone.match(re) ; }); 
      }
     
    }


loadCustomerPhones(){
  this.customerServiceService.getcustomers()
  .subscribe(
    data =>{
      this.phoneList = data;
      this.resultPhoneList = data;
    //  console.log("data",data)
    } 
    );
}

}
