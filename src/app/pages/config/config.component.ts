import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ApiService } from 'src/app/api.service';
import { FormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';




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
  ],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent implements OnInit{

  userEmail: string = null;
  currencies: Currency [] = [];
  currencyFrom: string = '';
  currencyTo: string = '';
  greaterThan: boolean = true;
  targetRate: number = null;

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
  }

  onSelect(event: any){
    // console.log("event target id:", event.source._id)
    // console.log("event values:", event.value)
    console.log("from:", this.currencyFrom)
    console.log("to:", this.currencyTo)
  }

  onSubmit(){
    console.log("from:", this.currencyFrom)
    console.log("to:", this.currencyTo)
    console.log("greaterThan:", this.greaterThan)
    console.log("targetRate:", this.targetRate)
  }
}
