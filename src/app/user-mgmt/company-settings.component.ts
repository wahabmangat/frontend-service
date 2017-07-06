import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryTermsSubForm } from './subforms/delivery-terms.component';
import { UserService } from './user.service';
import { CookieService } from 'ng2-cookies';
import { AddressSubForm } from './subforms/address.component';

@Component({
    selector: 'company-settings',
    templateUrl: './company-settings.component.html'
})

export class CompanySettingsComponent implements OnInit {

    public settingsForm: FormGroup;

    constructor(private _fb: FormBuilder,
                private cookieService: CookieService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.settingsForm = this._fb.group({
            address: AddressSubForm.generateForm(this._fb),
            deliveryTerms: DeliveryTermsSubForm.generateForm(this._fb),
        });

        this.initForm();
    }

    initForm() {
        let userId = this.cookieService.get('user_id');
        this.userService.getCompanySettings(userId).then( settings => {

            console.log('Fetched settings: ' + JSON.stringify(settings));

            // update forms
            AddressSubForm.update(this.settingsForm.controls['address'], settings.address);
            DeliveryTermsSubForm.update(this.settingsForm.controls['deliveryTerms'], settings.deliveryTerms);
        });
    }

    save(model: FormGroup) {
        // call API to save customer
        console.log(JSON.stringify(model.getRawValue()));
    }
}