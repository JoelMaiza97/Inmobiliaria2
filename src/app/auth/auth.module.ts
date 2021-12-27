import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MapaComponent } from './mapa/mapa.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    MapaComponent,
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule, 
    AuthRoutingModule, 
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCEYuM8fVW0bad0p7kIoPHVKaJltN39QQI'
    })
  ]
})
export class AuthModule { }
