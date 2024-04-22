import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ApiService } from 'src/app/api.service';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import { Validators } from '@angular/forms';



type Currency = {
  code: string;
  name: string;
}

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatChipsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent implements OnInit{

  userEmail: string = null;
  currencies: Currency [] = [];
  greaterThan: boolean = true;
  currencyForm: FormGroup = null;
  
  constructor(public auth: AuthService, private apiService: ApiService) {}

  loadExchangeRates() {
    this.apiService.getExchangeRates$().subscribe(
      (data) => {
        this.currencies = Object.values(data).map((currency) => { return {"code": currency.short_code, "name": currency.name}});
        this.currencies = this.currencies.filter(currency => currency.name)
        this.currencies = this.currencies.sort((a, b) => a.name.localeCompare(b.name));
      },
      (error) => {
        console.error('Failed to get exchange rates', error);
      }
    );
  }

  ngOnInit() {
    this.auth.user$.subscribe(
      (profile) => (this.userEmail = JSON.stringify(profile.email, null, 2))
    );
    this.loadExchangeRates();
    this.currencyForm = new FormGroup({
      currencyFrom: new FormControl('',
        [
          Validators.required
        ]),
      currencyTo: new FormControl('',
        [
          Validators.required
        ]),
      targetRate: new FormControl(0,[
        Validators.required,
        Validators.min(0.00000000001)
      ]),
    });
  }


  onSubmit(){
    console.log("from:", this.currencyForm.value.currencyFrom)
    console.log("to:", this.currencyForm.value.currencyTo)
    console.log("greaterThan:", this.greaterThan)
    console.log("targetRate:", this.currencyForm.value.targetRate)
  }
}
