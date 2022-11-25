import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';


@Component({
  selector: 'vex-online-application',
  templateUrl: './online-application.component.html',
  styleUrls: ['./online-application.component.scss']
})
export class OnlineApplicationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<OnlineApplicationComponent>) { }
  icClose = icClose;
  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close()
  }

}
