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
  searched: boolean = false;
  maxStops: number = 1;

  constructor(
    private _formBuilder: FormBuilder,
    private _flightsCalculator: FightsCalculatorService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.form = this._formBuilder.group({
      source: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3), this._autocompleteValidator()]],
      destination: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3), this._autocompleteValidator()]],
      stops: ['']
    }, {validators: this._noSameValueValidator('source', 'destination')});

    await this.getAllDestinations();

    this.initFilteredOptions();
  }

  _noSameValueValidator(source: string, destination: string) {
    return (formGroup: FormGroup): void => {
      const sourceControl: AbstractControl<any, any> = formGroup.controls[source];
      const destinationControl: AbstractControl<any, any> = formGroup.controls[destination];

      if (sourceControl.value.toUpperCase() === destinationControl.value.toUpperCase()) {
        destinationControl.setErrors({noMatch: true});
      } else {
        destinationControl.setErrors(null);
      }
    };
  }

  initFilteredOptions(): void {
    this.filteredSources = this.form.get('source')?.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '')),
    );

    this.filteredDestinations = this.form.get('destination')?.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '')),
    );
  }

  async getFlights(): Promise<void> {
    if (this.form.invalid) return;
    this.calculatedPaths = await this._flightsCalculator
      .getFlights(this.form.get('source')?.value.toUpperCase(), this.form.get('destination')?.value.toUpperCase());
    this.searched = true;
  }

  async getAllDestinations(): Promise<void> {
    this.allDestinations = await this._flightsCalculator.getAllDestinations();
  }

  private _filter(value: string): string[] {
    const filterValue: string = value.toLowerCase();
    return this.allDestinations?.filter((option: string) => option.toLowerCase().includes(filterValue));
  }

  private _autocompleteValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      this.allDestinations?.includes(control.value);
      if (control.value.length === 3 && !this.allDestinations?.includes(control.value.toUpperCase())) {
        return {'invalidAutocomplete': {value: control.value}}
      }
      return null;
    }
  }

  get existValidPath(): boolean {
    let validPath: boolean = false;
    if (!this.form.get('stops')?.value) return true;
    this.calculatedPaths?.forEach((path): void => {
      if (this.form.get('stops')?.value && (path.length <= this.maxStops)) {
        validPath = true;
      }
    });
    return validPath;
  }
}
