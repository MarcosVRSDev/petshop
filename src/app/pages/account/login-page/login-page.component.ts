import { Security } from './../../../utils/security.util';
import { CustomValidator } from './../../../validators/custom.validator';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;

  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder
  ) { 

    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required,
        CustomValidator.isCpf()
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ngOnInit(): void {
    const token = Security.getToken();
    if (token) {
      this.busy = true;
      this.service
        .refreshToken()
        .subscribe((data: any) =>{
          this.setUser(data.customer, data.token)
          this.busy = false;
        },
        (err)=> {
          localStorage.clear();
          this.busy = false;
        });
    }
  }

  submit() {
    this.busy = true;
    this.service.authenticate(this.form.value)
      .subscribe((data: any) =>{
        this.setUser(data.customer, data.token);
        this.busy = false;
      },
      (err)=> {
        console.log(err);
        this.busy = false;
      });
  }

  setUser(user, token) {
    Security.set(user, token);
    this.router.navigate(['/']);
  }

}
