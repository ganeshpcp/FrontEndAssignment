import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Rabobank';
  public progress: number;
  public message: string;
  public excelData: any;
  myHide : any;
  constructor() {

    this.myHide=true;
   }
  data = [];
  onFileChange(evt: any) {
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length === 1) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        console.log(wb);
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 })) as any;
      };
      reader.readAsBinaryString(target.files[0]);
    }
  }

 
  uploadfile() {
    this.myHide=false;
    let keys1 = this.data.shift();
    keys1=keys1[0].replaceAll(" ","").toLowerCase()+","+keys1[1].replaceAll(" ","").toLowerCase()+","+keys1[2].replaceAll(" ","").toLowerCase()+","+keys1[3].replaceAll(" ","").toLowerCase();
    var splitted = keys1.split(",");
    const keys=[];
  let  indesx=0;
    for (let m of splitted) {
keys[indesx]=m
indesx++;
    }


    const resArr: any = this.data.map((e) => {
      const obj = {};
      keys.forEach((key, i) => {
        obj[key] = e[i];
      });
      return obj;
    });

    resArr.sort((a, b) => parseInt(a.issuecount) - parseFloat(b.issuecount));
    this.excelData = resArr;
  }


  Done()
  {
    this.myHide=true;
  }
}
