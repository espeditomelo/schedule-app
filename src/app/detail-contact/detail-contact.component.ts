import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Contact } from '../contact/contact';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.component.html',
  styleUrls: ['./detail-contact.component.css']
})
export class DetailContactComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DetailContactComponent>,
    @Inject(MAT_DIALOG_DATA) public contact: Contact
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
