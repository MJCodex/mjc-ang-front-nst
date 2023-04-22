import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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

  ngOnInit() {
    this.form = this._formBuilder.group({
      source: ['', [Validators.required, Validators.maxLength(3)]],
      destination: ['', [Validators.required, Validators.maxLength(3)]],
      withReturn: ['']
    });

    this.initFilteredOptions();

    this.getAllDestinations();
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

  getFlights() {
    this.calculatedPaths = this._flightsCalculator.getFlights(this.form.get('source')?.value, this.form.get('destination')?.value);
  }

  getAllDestinations() {
    this.allDestinations = this._flightsCalculator.getAllDestinations();
  }

  private _filter(value: string): string[] {
    const filterValue: string = value.toLowerCase();
    return this.allDestinations.filter(option => option.toLowerCase().includes(filterValue));
  }
}
