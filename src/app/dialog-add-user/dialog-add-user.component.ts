import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!:  Date;
  loading = false;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  onNoClick() {

  }


  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Der aktuelle User ist:', this.user);
    this.loading = true;
    this.firestore
    .collection('users')
    .add(this.user.toJson())
    .then((result: any) => {
      this.loading = false;
      console.log('User added', result);
      this.dialogRef.close();
    });
  }

}
