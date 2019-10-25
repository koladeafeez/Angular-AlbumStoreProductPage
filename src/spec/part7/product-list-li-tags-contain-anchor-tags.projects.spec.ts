  
const assert = require("chai").assert;
const parse5 = require("parse5");
const cheerio = require("cheerio");
const helpers = require("../helpers");

describe("ProductListComponent", () => {
  it("should have anchor elements that have a routerLink attribute with the correct values @product-list-anchor-tags-have-routerlink-attribute", () => {
    let li, $, element, anchorTag;
    const productListFile = helpers.readFile(
      "src/app/product-list/product-list.component.html"
    );
    const productListNodes = helpers.parseFile(productListFile);

    helpers.readFile(
      "src/app/product-list/product-list.component.html",
      "The ProductListComponent doesn't exist - have you run the `ng` command to generate it yet?"
    );

    try {
      productListNodes[0].attrs.find(attr => (list = attr.value.match(/list/)));
      const productListing = parse5.serialize(productListNodes[0]);
      $ = cheerio.load(productListing);
      li = $("li");
      anchorTag = li.children("a");
      element = productListNodes[0].tagName;
    } catch (e) {
      assert(
        "The ProductListComponent's HTML file doesn't contain an `li` tag."
      );
    }

    assert(
      element !== "p",
      "It looks like you have not replaced the `<p></p>` element with an `ul` tag."
    );

    assert(
      element === "ul",
      "The ProductListComponent's HTML file doesn't contain an `ul` tag."
    );

    assert(
      li.length > 0,
      "It doesn't look like that there is a `<li></li>` element inside the ProductListComponent's HTML file."
    );

    assert(
      li.length < 2,
      "We shouldn't need more than one `<li></li>` element. We should be using the `ngFor` directive to generate the other list items."
    );

    assert(
      !!li.attr()["*ngfor"],
      "It doesn't look like that the ProductListComponent is using the `ngFor` directive."
    );

    assert(
      anchorTag.length > 0,
      "There aren't any list items with anchor tags as children in the ProductListComponent's template."
    );

    assert(
      anchorTag.text().match(/\s*{{\s*product.albumName\s*}}\s*/),
      "It doesn't look like that the opening and closing anchor tags are wrapping around `{{product.albumName}}`."
    );

    assert(
      !!anchorTag.attr()["routerlink"],
      "It looks like that the anchor tag inside ProductListComponent is not using the `routerLink` attribute with a value of `/product/{{product.id}}`."
    );

    assert(
      anchorTag.attr()["routerlink"].match(/\s*\/product\/{{product.id}}\s*/),
      "The `routerLink` directive doesn't have `/product/{{product.id}}` as its value."
    );

    assert(
      !!anchorTag.attr()["routerlinkactive"],
      "It looks like that the anchor tag inside ProductListComponent is not using the `routerLinkActive` attribute with a value of `active`."
    );

    assert(
      anchorTag.attr()["routerlinkactive"].match(/\s*active\s*/),
      "The `routerLinkActive` attribute doesn't have `active` as its value."
    );
  });
});

// import { TestBed, async, inject } from '@angular/core/testing';

// import { AppModule } from '../../app/app.module';

// import { Http, BaseRequestOptions, Response, ResponseOptions, RequestOptions } from '@angular/http';

// import { MockBackend, MockConnection } from '@angular/http/testing';

// import { Observable } from 'rxjs/Observable';

// import { Routes } from '@angular/router';

// import { RouterTestingModule } from '@angular/router/testing';

// let json = require('../../assets/products.json');

// let productListComponentExists = false;
// let ProductListComponent;
// try {
//   ProductListComponent = require('../../app/product-list/product-list.component.ts').ProductListComponent;
//   productListComponentExists = true;
// } catch (e) {
//   productListComponentExists = false;
// }

// let productServiceExists = false;
// let ProductService;
// try {
//   ProductService = require('../../app/product.service.ts').ProductService;
//   productServiceExists = true;
// } catch (e) {
//   productServiceExists = false;
// }

// describe('ProductListComponent', () => {

//   let product_service;
//   let mock_backend;

//   beforeEach(async(() => {

//     TestBed.configureTestingModule({
//       imports: [AppModule, RouterTestingModule.withRoutes([])],
//       providers: [ProductService, MockBackend, BaseRequestOptions,
//         {
//           provide: Http,
//           useFactory: (mockBackend: MockBackend, defaultOptions: RequestOptions) => {
//             return new Http(mockBackend, defaultOptions);
//           },
//           useClass: Http,
//           deps: [MockBackend, BaseRequestOptions]
//         }
//       ]
//     });
//   }));

//   beforeEach(inject([ProductService, MockBackend], (productService, mockBackend) => {
//     product_service = productService;
//     mock_backend = mockBackend;
//   }));

//   it(`should have anchor elements inside of li elements that contain the album name @product-list-li-tags-contain-anchor-tags`, async(() => {
//     since('The ProductListComponent doesn\'t exist - have you run the `ng` command to generate it yet?').expect(productListComponentExists).toBe(true);

//     mock_backend.connections.subscribe((connection: MockConnection) => {
//       let options = new ResponseOptions({
//         body: json
//       });
//       connection.mockRespond(new Response(options));
//     });

//     const ProductListFixture = TestBed.createComponent(ProductListComponent);
//     ProductListFixture.detectChanges();

//     since('There aren\'t any list items with anchor tags as children in the ProductListComponent\'s template.').expect(ProductListFixture.nativeElement.querySelectorAll('li a').length).toBe(2);
//     if (ProductListFixture.nativeElement.querySelectorAll('li a').length > 0) {
//       since('The album name in the first anchor tag of your HTML template doesn\'t match the first album name in the `products` JSON response.').expect(ProductListFixture.nativeElement.querySelectorAll('li a')[0].innerHTML = 'Opacity Zero');
//       since('The album name in the second anchor tag of your HTML template doesn\'t match the second album name in the `products` JSON response.').expect(ProductListFixture.nativeElement.querySelectorAll('li a')[1].innerHTML = 'Top, Right, Bottom, Left');
//     }

//   }));

// });
