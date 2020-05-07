import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  constructor( public cs: ChatService ) { }

  login( provider: string ) {
    console.log(provider)

    this.cs.login( provider )
  }

}
