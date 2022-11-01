import { trigger, state, style, transition, animate } from '@angular/animations';
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
// import { ScrumboardDialogComponent } from './components/scrumboard-dialog/scrumboard-dialog.component';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Scrumboard } from './interface/scrumboard.interface';
import { PopoverService } from '../../../../@vex/components/popover/popover.service';
import { FormControl, UntypedFormControl } from '@angular/forms';
// import { stagger80ms } from '../../../../@vex/animations/stagger.animation';
// import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { ConfigService } from '../../../../@vex/config/config.service';
import { Observable } from 'rxjs';

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

  showMenu = true;
  static nextId = 100;

  board$ = this.route.paramMap.pipe(
    map(paramMap => +paramMap.get('scrumboardId')),
    map(scrumboardId => scrumboards.find(board => board.id === 1))
  );

  addCardCtrl = new UntypedFormControl();
  addListCtrl = new UntypedFormControl();

  isVerticalLayout$: Observable<boolean> = this.configService.select(config => config.layout === 'vertical');


  trackById = trackById;

  scrumboardUsers = scrumboardUsers;
  layoutCtrl = new FormControl("boxed");


  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private popover: PopoverService,
              private readonly configService: ConfigService) { }

  ngOnInit() {
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

  open(){
    this.showMenu = false;
  }
  createCard(list: ScrumboardList, close: () => void) {
    if (!this.addCardCtrl.value) {
      return;
    }

    close();

    this.addCardCtrl.setValue(null);
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

}
