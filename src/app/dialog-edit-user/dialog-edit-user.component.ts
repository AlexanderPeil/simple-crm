import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  user!: User;
  loading = false;
  userId!: string;
  birthDate!: Date;


  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private firestore: AngularFirestore) { }


  ngOnInit(): void {

  }


  close() {
    this.dialogRef.close();
  }


  saveUser() {
    let userData = this.user.toJson();
    delete userData.customIdName; 
    this.loading = true;
  
    this.firestore
    .collection('users')
    .doc(this.userId)
    .update(this.user.toJson()) 
    .then(() => {
      this.loading = false;
      this.dialogRef.close();
    })
  }  

}
