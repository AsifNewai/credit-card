import { OnlineApplicationComponent } from './online-application/online-application.component';
import { fadeInUp400ms } from './../../../../@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from './../../../../@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from './../../../../@vex/animations/scale-in.animation';
import { stagger80ms } from './../../../../@vex/animations/stagger.animation';
import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { ScrumboardList } from './interface/scrumboard-list.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ScrumboardCard } from './interface/scrumboard-card.interface';
import { trackById } from '../../../../@vex/utils/track-by';
import { scrumboards, scrumboardUsers } from './interface/scrumboard';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Scrumboard } from './interface/scrumboard.interface';
import { PopoverService } from '../../../../@vex/components/popover/popover.service';
import { FormControl, UntypedFormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfigService } from '../../../../@vex/config/config.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'vex-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ],
  
})


export class CreditCardComponent implements OnInit {
  // {position: 1, name: 'Alex', cardtype: 'Gold Visa', symbol: 'H'},

  ELEMENT_DATA: any[] = [
    {position: 1, name: 'Alex', cardtype: 'Gold Visa'},
    {position: 2, name: 'Tom', cardtype: 'Classic Visa'},
  ];
  displayedColumns: string[] = ['position', 'name', 'cardtype'];
  dataSource = this.ELEMENT_DATA;
  clickedRows = new Set();
  showMenu = true;
  static nextId = 100;
  visaId = null;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'text/xml',
      'Authorization': 'Basic ' + btoa('aniketg@appcino.com:aniket@0106')
    })
  };
  isSubmit = null;
  board$ = this.route.paramMap.pipe(
    map(paramMap => +paramMap.get('scrumboardId')),
    map(scrumboardId => scrumboards.find(board => board.id === 1))
  );

  addCardCtrl = new UntypedFormControl();
  addListCtrl = new UntypedFormControl();
  isNewUser:number;
  showInnerContent = true;
  isVerticalLayout$: Observable<boolean> = this.configService.select(config => config.layout === 'vertical');
  form:FormGroup;
  trackById = trackById;

  scrumboardUsers = scrumboardUsers;
  layoutCtrl = new FormControl("boxed");


  constructor(private dialog: MatDialog,
              private http:HttpClient,
              private route: ActivatedRoute,
              private popover: PopoverService,
              private readonly configService: ConfigService,private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      mobileNumber:[],
      panNumber:[],
      pincode:[],
      annualIncome:[],
      name:[],
      dob:[],
    })
  }

  drop(event: CdkDragDrop<ScrumboardCard[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  radioChange(){
    if(this.isNewUser){
      this.showInnerContent = false;
    }else{
      this.showInnerContent = true;
    }
  }
  dropList(event: CdkDragDrop<ScrumboardList[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getConnectedList(board: Scrumboard) {
    return board.children.map(x => `${x.id}`);
  }

  openAddCard(list: ScrumboardList, content: TemplateRef<any>, origin: HTMLElement) {
    this.popover.open({
      content,
      origin,
      position: [
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'bottom'
        },
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
        },
      ]
    });
  }

  openAddList(board: Scrumboard, content: TemplateRef<any>, origin: HTMLElement) {
    this.popover.open({
      content,
      origin,
      position: [
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top'
        },
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
        },
      ]
    });
  }

  open(id){
    let cardType
    if(id==1){
      cardType = 'Classic Visa'
    }else if(id==2){
      cardType = 'Platinum Visa'
    }else if(id==3){
      cardType = 'Gold Visa'
    }else{
      cardType = 'Diamond Visa'
    }
    this.isSubmit = false;
    this.visaId = cardType;
    this.showMenu = false;
  }

  cancel(){
    this.form.reset();
    this.showInnerContent = true;
    this.isNewUser = 0;
  }
  createCard(list: ScrumboardList, close: () => void) {
    if (!this.addCardCtrl.value) {
      return;
    }

    close();

    this.addCardCtrl.setValue(null);
  }

  back(){
    this.showMenu = true;
  }

  createList(board: Scrumboard, close: () => void) {
    if (!this.addListCtrl.value) {
      return;
  }


    close();

    this.addListCtrl.setValue(null);
  }

  toggleStar(board: Scrumboard) {
    board.starred = !board.starred;
  }

  openDialogue(){
   this.http.post("https://cc-dev.appiancloud.com/suite/webapi/generateRequest?clientId=1",{},this.httpOptions).subscribe((res)=>{
    this.isSubmit=true;
    const dialogRef = this.dialog.open(OnlineApplicationComponent, {
      width: '630px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.form.reset();
      this.showMenu = true;
      this.showInnerContent = true;
      this.isNewUser = 0;
    });   
  })

  }

}
