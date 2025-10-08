import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// PrimeNG modules
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { CardModule } from "primeng/card";

@Component({
  selector: 'app-primeng-reactive-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DatePickerModule,
    SelectModule,
    PasswordModule,
    CheckboxModule,
    TextareaModule,
    ButtonModule,
    CardModule
],
  templateUrl: './reactive-forms.html',
  styleUrl: './reactive-forms.scss'
})
export class ReactiveForms {
  
  private fb = inject(FormBuilder);

  countries = [
    { label: 'Select country', value: null },
    { label: 'USA', value: 'US' },
    { label: 'United Kingdom', value: 'UK' },
    { label: 'France', value: 'FR' },
    { label: 'Japan', value: 'JP' },
  ];

  form = this.fb.group(
    {
      fullName: this.fb.control<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      age: this.fb.control<number | null>(null, [
        Validators.required,
        Validators.min(18),
        Validators.max(120),
      ]),
      birthDate: this.fb.control<Date | null>(null, [
        Validators.required,
        this.notInFuture(),
      ]),
      country: this.fb.control<string | null>(null, [Validators.required]),
      password: this.fb.control<string>('', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrength(),
      ]),
      agree: this.fb.control<boolean>(false, [Validators.requiredTrue]),
      startDate: this.fb.control<Date | null>(null),
      endDate: this.fb.control<Date | null>(null),
    },
    {
      validators: [this.dateRangeValidator('startDate', 'endDate')],
    }
  );

  // --- Custom validators ---

  /** Disallow future dates */
  private notInFuture(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as Date | null;
      if (!value) return null;
      const today = new Date();
      // compare only date part
      const v = new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime();
      const t = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
      return v > t ? { notInFuture: true } : null;
    };
  }

  /** Ensure password has lower, upper, digit */
  private passwordStrength(): ValidatorFn {
    const hasLower = /[a-z]/;
    const hasUpper = /[A-Z]/;
    const hasDigit = /\d/;
    return (control: AbstractControl): ValidationErrors | null => {
      const v = (control.value || '') as string;
      const ok = hasLower.test(v) && hasUpper.test(v) && hasDigit.test(v);
      return ok ? null : { weakPassword: true };
    };
  }

  /** Cross-field: startDate <= endDate (if both provided) */
  private dateRangeValidator(startKey: string, endKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const start = group.get(startKey)?.value as Date | null;
      const end = group.get(endKey)?.value as Date | null;
      if (!start || !end) return null;
      return start.getTime() <= end.getTime() ? null : { invalidDateRange: true };
    };
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    // do something meaningful with form value
    console.log('Form value:', this.form.value);
    alert('Submitted! ✅');
  }
}
