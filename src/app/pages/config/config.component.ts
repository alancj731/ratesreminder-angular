import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from 'src/app/api.service';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { Validators } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

type Currency = {
  code: string;
  name: string;
};

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
    MatDialogModule,
  ],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css',
})
export class ConfigComponent implements OnInit {
  userEmail: string = null;
  currencies: Currency[] = [];
  greaterThan: boolean = true;
  currencyForm: FormGroup = null;

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  loadExchangeRates() {
    this.apiService.getExchangeRates$().subscribe(
      (data) => {
        this.currencies = Object.values(data).map((currency) => {
          return { code: currency.short_code, name: currency.name };
        });
        this.currencies = this.currencies.filter((currency) => currency.name);
        this.currencies = this.currencies.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
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
      currencyFrom: new FormControl('', [Validators.required]),
      currencyTo: new FormControl('', [Validators.required]),
      targetRate: new FormControl(0, [
        Validators.required,
        Validators.min(0.00000000001),
      ]),
    });
  }

  onSubmit() {
    this.openConfirmDialog();
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm',
        message: 'Are you sure to set this reminder?',
      },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.setReminder();
      }
    });
  }
  setReminder() {
    const backEndUrl = "ratesrmdserver.onrender.com";
    // let url = 'http://' + window.location.hostname + ':3000/api/v1/';
    let url = 'https://' + backEndUrl + '/api/v1/';
    console.log('backend url: ', url)
    
    const body = {
      email: this.userEmail.replace(/^"|"$/g, ''),
      from: this.currencyForm.value.currencyFrom,
      to: this.currencyForm.value.currencyTo,
      target: parseFloat(this.currencyForm.value.targetRate),
      greater: this.greaterThan,
    };

    const result = this.apiService.putReminder$(url, body).subscribe({
      next: (response) => {
        // successful response
        let message = 'Reminder set successfully';
        if (response.status !== 200) {
          message = 'Failed to set reminder';
        }
        this.snackBar.open(message, 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        // failed response
        this.snackBar.open('Failed to set reminder', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
    });
  }
}
