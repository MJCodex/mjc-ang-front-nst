import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Observable, startWith, map} from "rxjs";
import {FightsCalculatorService} from "../../services/fights-calculator.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form!: FormGroup;
  allDestinations!: string[];
  filteredSources?: Observable<string[]>;
  filteredDestinations?: Observable<string[]>;
  calculatedPaths?: any[];

  constructor(
    private _formBuilder: FormBuilder,
    private _flightsCalculator: FightsCalculatorService
  ) {
  }

  async ngOnInit() {
    this.form = this._formBuilder.group({
      source: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3), this._autocompleteValidator()]],
      destination: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3), this._autocompleteValidator()]]
    });

    await this.getAllDestinations();

    this.initFilteredOptions();
  }

  initFilteredOptions() {
    this.filteredSources = this.form.get('source')?.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '')),
    );

    this.filteredDestinations = this.form.get('destination')?.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '')),
    );
  }

  async getFlights() {
    if (this.form.invalid) return;
    this.calculatedPaths = await this._flightsCalculator
      .getFlights(this.form.get('source')?.value.toUpperCase(),this.form.get('destination')?.value.toUpperCase());
  }

  async getAllDestinations() {
    this.allDestinations = await this._flightsCalculator.getAllDestinations();
  }

  private _filter(value: string): string[] {
    const filterValue: string = value.toLowerCase();
    return this.allDestinations?.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _autocompleteValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      this.allDestinations?.includes(control.value);
      if (!this.allDestinations?.includes(control.value.toUpperCase())) {
        return {'invalidAutocomplete': {value: control.value}}
      }
      return null;
    }
  }
}
