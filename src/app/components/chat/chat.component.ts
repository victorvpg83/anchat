import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje = ''
  elm: any

  constructor( public cs: ChatService ) {
    this.cs.loadMessages()
      .subscribe( () => {

        setTimeout(() => {
          this.elm.scrollTop = this.elm.scrollHeight
        }, 20);
      })
  }

  ngOnInit() {
    this.elm = document.getElementById( 'app-mensajes' )
  }

  sendMessage() {
    console.log( this.mensaje )
    if ( this.mensaje.length === 0 ) {
      return
    }

    this.cs.addMessage( this.mensaje )
      .then( () => this.mensaje = '' )
      .catch( ( err ) => console.error('Error al guardar', err ) )
  }

}
