import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import 'firebase/auth'

import { map } from 'rxjs/operators'

import { Message } from '../interface/message.interface';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Message>;

  public chats: Message[] = []
  public user: any = {}

  constructor( private afs: AngularFirestore,
               public afAuth: AngularFireAuth ) {

    this.afAuth.authState.subscribe( usr => {

      console.log(usr)

      if ( !usr ) { return }

      this.user.name = usr.displayName
      this.user.uid = usr.uid

    })
  }

   login( provider: string ) {

      this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.user = {}
    this.afAuth.signOut();
  }

  loadMessages() {
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy( 'fecha', 'desc' )
                                                                           .limit( 10 ));

    return this.itemsCollection.valueChanges().pipe(
      map( (messages: Message[]) => {
        console.log(messages)

        this.chats = []

        for ( const msg of messages ) {
          this.chats.unshift( msg )
        }

        return this.chats
      }))
}

  addMessage( text: string ) {

    const message: Message = {
      nombre: this.user.name,
      mensaje: text,
      fecha: new Date().getTime(),
      uid: this.user.uid
    }
    return this.itemsCollection.add( message )
  }

}
