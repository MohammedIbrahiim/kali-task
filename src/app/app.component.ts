import { Component } from '@angular/core';
import { DataService } from './service/data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import{ProductData} from '../app/interface/product-data'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kali-task';
  dataArray:ProductData[]=[]
  activeImageColor:string[]=[]
  activeImage:string=''
  arrayNewPagination :ProductData[]=[] 
  count:number = 1
  arrowArray:{id:number,icon:string}[]=[ {id:1,icon:'icon-thin-long-arrow-left-icon'},{id:2,icon:'icon-thin-long-arrow-right-icon ms-4'}]
  activeIdColor:number = 1
  idPagination:number = 1
  idImage:number = 0
  idSizeChoice:number = 0
  addToCartArray:ProductData[]=[]
  constructor(private _DataService:DataService , private _DomSanitizer: DomSanitizer){
    this.getAllData()
  }


  // ==================================== for get all data from data.json ===========================
  getAllData(){
    this._DataService.getAllData().subscribe(res=>{
      this.dataArray =res      
      this.paginationIndecators(1)
      this.getActiveColor(this.dataArray[0].colors[0].images, 0) 
      
    })
  }


  // ================================== for get array of image dependancy color active ===============
  getActiveColor(item:string[] , index:number){
    
    this.activeImageColor = item
    this.activeImage =item[0]
    this.activeIdColor = index
    this.idImage = 0

  }

  // ================================= for get image disply dependency click at image active color ===
  getImageActive(item:string , index:number){
    this.activeImage =item  
    this.idImage = index    
  }
  getSize(item:number,id:number){
    this.idSizeChoice = id
  }
  // ================================= pagination by indecators under image ========================== 
  paginationIndecators(id:number){
    this.arrayNewPagination = []
    this.idPagination = id
    this.count=this.idPagination
    const index = this.dataArray.findIndex(element => element.id == id);
    this.arrayNewPagination.push(this.dataArray[index])
    this.getActiveColor(this.arrayNewPagination[0].colors[0].images,0)
  }


  // ================================= pagination by arrows under image ========================== 
  paginationArrows(id:number){
    if(id==2 && this.count<=this.dataArray.length-1){
      this.count = this.count+1
      this.paginationIndecators(this.count)
    }else if(id==1 &&this.count!=1){
      this.count = this.count-1
      this.paginationIndecators(this.count)
    }    
     
  }

// ================================= add to cart ================================
// i am use some method for prevent push same array to my array we must use the quentity 
  addToCart(item:ProductData){    
    const isDuplicate = this.addToCartArray.some((person) => person.id == item.id);
    if(!isDuplicate){
      this.addToCartArray.push(item)
    }    
  }

// =================== to make url open at ifram =======================
  getSafeUrl(url: string): SafeResourceUrl {
    var urls = url.replace("watch?v=", "embed/");    
    return this._DomSanitizer.bypassSecurityTrustResourceUrl(urls);
  }
}
