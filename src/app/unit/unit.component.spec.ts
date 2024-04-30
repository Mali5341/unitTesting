import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http'; 

import { UnitComponent } from './unit.component';
import { ServiceService } from '../service/service.service';

describe('UnitComponent', () => {
  let component: UnitComponent;
  let fixture: ComponentFixture<UnitComponent>;
  let serviceService: ServiceService; // Declare the service variable
  let httpMock : HttpTestingController;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitComponent ],
      imports: [HttpClientTestingModule, HttpClientModule],
providers: [ServiceService]
    }).compileComponents();

    fixture = TestBed.createComponent(UnitComponent);
    component = fixture.componentInstance;
    serviceService = TestBed.inject(ServiceService); // Inject the service
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that there are no outstanding HTTP requests
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("check the sum of a and b", () => {
    expect(component.sum(100, 120)).toBe(220);
  });

  it("check the component Name", () => {
    expect(component.componentName).toBe("unit");
  });

  it("check the multiplication of x and y", () => {
    expect(component.multiplication(5, 6)).toBe(30)
  });

  it("check userDetails from Backend", () => {
    spyOn(serviceService, 'getUserData').and.returnValue([
      { name: "", age: 20, position: "" },
    ]);

    fixture.detectChanges();

    expect(component.userDetails).toEqual([
      { name: "", age: 20, position: "" },
    ]);
  });

  it("check Html Element", () => {
    const collection = fixture.nativeElement;
    expect(collection.querySelector('.unit-test').textContent).toContain('Test')
  });

  it('should POST data to server', () => {
    const testData = { name:'', position: '', profilePic:'', salary:Number };
    const mockResponse = { success: true };

    serviceService.postData(testData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://192.168.100.14:8080/employees');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
