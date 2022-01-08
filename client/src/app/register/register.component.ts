import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormControl,
	FormGroup,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
	@Output() cancelRegister = new EventEmitter();
	model: any = {};
	registerForm: FormGroup;

	constructor(
		private accountService: AccountService,
		private toastr: ToastrService,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.initializeForm();
	}

	initializeForm() {
		this.registerForm = this.fb.group({
			username: ['', Validators.required],
			password: ['', [
				Validators.required,
				Validators.minLength(4),
				Validators.maxLength(12),
			]],
			confirmPassword: ['', [
				Validators.required,
				this.matchValues('password'),
			]],
		});

		this.registerForm.controls.password.valueChanges.subscribe(() => {
			this.registerForm.controls.confirmPassword.updateValueAndValidity();
		});
	}

	// Customize validator
	matchValues(matchTo: string): ValidatorFn {
		return (control: AbstractControl) => {
			return control?.value === control?.parent?.controls[matchTo].value
				? null
				: { isMatching: true };
		};
	}

	register() {
		console.log(this.registerForm.value);
		// this.accountService.register(this.model).subscribe(
		// 	respond => {
		// 		console.log(respond);
		// 		this.cancel();
		// 	}, error => {
		// 		console.log(error);
		// 		this.toastr.error(error.error);
		// 	});
	}

	cancel() {
		this.cancelRegister.emit(false);
	}
}
