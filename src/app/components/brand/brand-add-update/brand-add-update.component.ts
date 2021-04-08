import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add-update',
  templateUrl: './brand-add-update.component.html',
  styleUrls: ['./brand-add-update.component.css']
})
export class BrandAddUpdateComponent implements OnInit {
  brandUpdateForm: FormGroup;
  brandAddForm: FormGroup;
  brands: Brand[];
  selectedBrand: Brand;



  brandId: number;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (param['brandId']) {
        this.brandId = param['brandId'],
        this.getBrandsById(param["brandId"]);  

      }
    });
    this.getBrands();
    this.createBrandUpdateForm();
    this.createBrandAddForm();
  }


 

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandId:[this.brandId], 
      brandName: ['', Validators.required],
    });
  }
 
  
  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ['', Validators.required],
    });
  }

  add() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.add(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'The brand added!');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Validation Error!'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('There is empty places, please check again!');
    }
  }


update() {
  if (this.brandUpdateForm.valid) {
    let brandModel = Object.assign({}, this.brandUpdateForm.value);
    this.brandService.update(brandModel).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'The brand updated!');
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              'Validation Error!'
            );
          }
        }
      }
    );
  } else {
    this.toastrService.error('There is empty places, please check again!');
  }
}

getBrands() {
  this.brandService.getBrands().subscribe((response) => {
    this.brands = response.data;

  });
}
getBrandsById(brandId:number){
  this.brandService.getBrandsByBrandId(brandId).subscribe(response=>{
    this.selectedBrand=response.data[0]
    this.brandUpdateForm.setValue({
      brandId:this.selectedBrand.brandId,
      brandName:this.selectedBrand.brandName
    })
  })
  }
}