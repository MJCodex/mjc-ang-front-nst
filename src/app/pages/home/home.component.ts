import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, startWith, map} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  form!: FormGroup;
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions?: Observable<string[]>;

  constructor(
    private _formBuilder: FormBuilder,
  ) {
  }
  ngOnInit() {
    this.form = this._formBuilder.group({
      source: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      withReturn: ['']
    });
    this.filteredOptions = this.form.get('source')?.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue: string = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
