import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ProductService } from "src/app/service/product.service"

describe('Product Service', () => {
    let service: ProductService;
    let httpMock: HttpTestingController;
    const peticion: any =
    {
        "records": [
            {
                "createdAt": 1716311578288,
                "updatedAt": 1716311578288,
                "id": 1,
                "productBrand": "Telcel",
                "productModel": "sim card",
                "productDescription": "N/A",
                "productPrice": 2000,
                "productGuaranteeUnit": 36,
                "productGuaranteeUnitMeasure": "dia",
                "productGuaranteeSpecifications": "Defectos de fabricación",
                "productAsset": "circulante",
                "productActive": true,
                "productCategoryId": {
                    "createdAt": 1689981908457,
                    "updatedAt": 1689981908457,
                    "id": 2,
                    "productCategoryDescription": "SIM Card",
                    "productCategoryActive": true
                },
                "productFile": []
            },
            {
                "createdAt": 1716414276362,
                "updatedAt": 1716414276362,
                "id": 2,
                "productBrand": "Concox",
                "productModel": "qbit",
                "productDescription": "N/A",
                "productPrice": 2000,
                "productGuaranteeUnit": 36,
                "productGuaranteeUnitMeasure": "dia",
                "productGuaranteeSpecifications": "Defectos de fabricación",
                "productAsset": "circulante",
                "productActive": true,
                "productCategoryId": {
                    "createdAt": 1689981908457,
                    "updatedAt": 1689981908457,
                    "id": 1,
                    "productCategoryDescription": "Gps",
                    "productCategoryActive": true
                },
                "productFile": []
            },
            {
                "createdAt": 1718663927215,
                "updatedAt": 1718663927215,
                "id": 3,
                "productBrand": "Telcel",
                "productModel": "sim card",
                "productDescription": "N/A",
                "productPrice": 2000,
                "productGuaranteeUnit": 36,
                "productGuaranteeUnitMeasure": "dia",
                "productGuaranteeSpecifications": "Defectos de fabricación",
                "productAsset": "circulante",
                "productActive": true,
                "productCategoryId": {
                    "createdAt": 1689981908457,
                    "updatedAt": 1689981908457,
                    "id": 2,
                    "productCategoryDescription": "SIM Card",
                    "productCategoryActive": true
                },
                "productFile": []
            }
        ]
    }
    const responseGetId=
    {
    "productFile": [],
    "createdAt": 1716414276362,
    "updatedAt": 1716414276362,
    "id": 2,
    "productBrand": "Concox",
    "productModel": "qbit",
    "productDescription": "N/A",
    "productPrice": 2000,
    "productGuaranteeUnit": 36,
    "productGuaranteeUnitMeasure": "dia",
    "productGuaranteeSpecifications": "Defectos de fabricación",
    "productAsset": "circulante",
    "productActive": true,
    "productCategoryId": 1
    }
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductService]
        });
        service = TestBed.inject(ProductService);
        httpMock = TestBed.inject(HttpTestingController);
    })
    afterEach(()=>{
        httpMock.verify();
    })
    it('Debería obtener los datos correctamente', () => {
        service.getAll(3, 1, "%5B%7B%22id%22:%22asc%22%7D%5D").subscribe(
            data => {
                expect(data).toEqual(peticion.records);
            }
        )
        const req = httpMock.expectOne('http://localhost:1337/product/list?limit=3&page=1&sort=%5B%7B%22id%22:%22asc%22%7D%5D');
        expect(req.request.method).toBe('GET');
        req.flush(peticion.records);
    })
    it("Deberia testear el enviar datos vacíos",()=>{
        service.getAll(3, 1, "%5B%7B%22id%22:%22asc%22%7D%5D").subscribe(
            data=>{
                expect(data.length).toEqual(0)
            }
        )
        const req=httpMock.expectOne('http://localhost:1337/product/list?limit=3&page=1&sort=%5B%7B%22id%22:%22asc%22%7D%5D');
        //se responde con un error para ser testeado y manejarlo
        const mensaje="No se encontró";
        req.flush([]);
    })
    it("Deberia filtrar por el texto",()=>{
        service.getFilter('[{"value":"concox","matchMode":"startsWith","field":"productBrand"}]',3, 1, "%5B%7B%22id%22:%22asc%22%7D%5D").subscribe(
            data=>{
                expect(data).toEqual(peticion.records)
            }
        )
        const req=httpMock.expectOne('http://localhost:1337/product/list?filters=%5B%7B%22value%22:%22concox%22,%22matchMode%22:%22startsWith%22,%22field%22:%22productBrand%22%7D%5D&limit=3&page=1&sort=%5B%7B%22id%22:%22asc%22%7D%5D');
        expect(req.request.method).toBe('GET');
        req.flush(peticion.records);
    })
    xit("Deberia crear un producto",()=>{
        let productPropertys:string;
        //productPropertys["numero"]="3388393939";
        service.create(productPropertys).subscribe(
            data=>{
                console.log(data);
                expect(data).toEqual(peticion.records)
            }
        )
        const req=httpMock.expectOne('http://localhost:1337/product/add');
        expect(req.request.method).toBe('POST');
        req.flush(peticion.records);
    })
    it("Deberia filtrar por id",()=>{
        service.getById(3).subscribe(
            data=>{
                expect(data).toEqual(peticion.records)
            }
        )
        const req=httpMock.expectOne('http://localhost:1337/product/find?id=3');
        expect(req.request.method).toBe('GET');
        req.flush(peticion.records);
    })
})