import { Component, OnInit } from '@angular/core';
import img from './invoice.headerimg';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { InvoiceService } from './invoice.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [InvoiceService],
})
export class InvoiceComponent implements OnInit {
  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {}

  generatePDF() {
    const retrievedMerged = this.invoiceService.getSpecificationsMerged();
    const retrievedSpecifications = this.invoiceService.getSpecifications();
    const columnElement1: any = [];
    const columnElement2: any = [];
    const columnElement3 = [];
    const columnElement4 = [];
    let pushColumnLeft: boolean = false;

    //LOOP FOR FAST DELIVERIES
    for (let i = 0; i < retrievedMerged.length; i++) {
      if (i % 16 === 0) {
        pushColumnLeft = !pushColumnLeft;
        if (pushColumnLeft) {
          columnElement1.push({
            text: 'Date                                          #                             €',
            fontSize: 40,
            margin: [170, 60.5, 0, 0],
            bold: true,
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 170,
                y1: 30.5,
                x2: 655,
                y2: 30.5,
                lineWidth: 1,
              },
              {
                type: 'line',
                x1: 670,
                y1: 30.5,
                x2: 950,
                y2: 30.5,
                lineWidth: 1,
              },
              {
                type: 'line',
                x1: 970,
                y1: 30.5,
                x2: 1160,
                y2: 30.5,
                lineWidth: 1,
              },
              
            ], 
          },
          {
            text:'whitespace',
            fontSize:60,
            color:'white'
          });
        } else {
          columnElement2.push(
          {
            text: 'Date                                          #                              €',
            fontSize: 40,
            margin: [0, 60.5, 170, 0],
            bold: true,
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 30.5,
                x2: 480,
                y2: 30.5,
                lineWidth: 1,
              },
              {
                type: 'line',
                x1: 500,
                y1: 30.5,
                x2: 780,
                y2: 30.5,
                lineWidth: 1,
              },
              {
                type: 'line',
                x1: 820,
                y1: 30.5,
                x2: 1010,
                y2: 30.5,
                lineWidth: 1,
              },
            ],
          },
          {
            text:'whitespace',
            fontSize:60,
            color:'white'
          });
        }
      }
      if (pushColumnLeft) {
        columnElement1.push({
          text:
            retrievedMerged[i].date +
            ', ' +
            retrievedMerged[i].time +
            ' ' +
            retrievedMerged[i].orderNumber + 'ASDF' +
            ' ' +
            // addZeroes(retrievedMerged[i].price) +
            999.99+
            ' *',
          fontSize: 40,
          margin: [170, 30, 0, 0],
          lineHeight: 2,
          characterSpacing:6
        });
      }
      else {
        columnElement2.push({
          text:
            retrievedMerged[i].date +
            ', ' +
            retrievedMerged[i].time +
            ' ' +
            retrievedMerged[i].orderNumber + 'DOAD' +
            ' ' +
            //addZeroes(retrievedMerged[i].price) +
            999.99+
            ' *',
          fontSize: 40,
          margin: [0, 30, 170, 0],
          lineHeight: 2,
          characterSpacing:6,
        });
      }
    }

    //LOOP FOR NORMAL DELIVERIES
    for (let i = 0; i < retrievedMerged.length; i++) {
      if (i % 15 === 0) {
        pushColumnLeft = !pushColumnLeft;
        if (pushColumnLeft) {
          columnElement3.push({
            text: 'Date                                          #                             €',
            fontSize: 40,
            margin: [170, 200, 0, 0],
            bold: true,
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 170,
                y1: 30.5,
                x2: 655,
                y2: 30.5,
                lineWidth: 1,
              },
              {
                type: 'line',
                x1: 670,
                y1: 30.5,
                x2: 950,
                y2: 30.5,
                lineWidth: 1,
              },
              {
                type: 'line',
                x1: 970,
                y1: 30.5,
                x2: 1160,
                y2: 30.5,
                lineWidth: 1,
              },
            ],
            
          },{
            text:'whitespace',
            fontSize:60,
            color:'white'
          });
        } else {
          columnElement4.push(
          {
            text: 'Date                                          #                              €',
            fontSize: 40,
            margin: [0, 200, 170, 0],
            bold: true,
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 30.5,
                x2: 480,
                y2: 30.5,
                lineWidth: 1,
              },
              {
                type: 'line',
                x1: 500,
                y1: 30.5,
                x2: 780,
                y2: 30.5,
                lineWidth: 1,
              },
              {
                type: 'line',
                x1: 820,
                y1: 30.5,
                x2: 1010,
                y2: 30.5,
                lineWidth: 1,
              },
            ],
          },{
            text:'whitespace',
            fontSize:60,
            color:'white'
          }
          );
        }
      }
      if (pushColumnLeft) {
        columnElement3.push({
          text:
            retrievedMerged[i].date +
            ', ' +
            retrievedMerged[i].time +
            ' ' +
            retrievedMerged[i].orderNumber + 'DPAO'+
            ' ' +
            //addZeroes(retrievedMerged[i].price) +
            999.99+
            ' *',
          fontSize: 40,
          margin: [170, 30, 0, 0],
          lineHeight: 2,
          characterSpacing:6
        });
      }
      else {
        columnElement4.push({
          text:
            retrievedMerged[i].date +
            ', ' +
            retrievedMerged[i].time +
            ' ' +
            retrievedMerged[i].orderNumber + 'POAD' +
            ' ' +
            //addZeroes(retrievedMerged[i].price) +
            999.99+
            ' *',
          fontSize: 40,
          margin: [0, 30, 170, 0],
          lineHeight: 2,
          characterSpacing:6,
        });
      }
    }

    

    function addZeroes(num:number) {
      const inputNumber=num.toString()
      const dec = inputNumber.split('.')[1]
      const len = dec && dec.length > 2 ? dec.length : 2
      return Number(num).toFixed(len)
    }

    
    const docDefinition = {
      //PAGE SETTINGS AND HEADER SETTINGS
      pageMargins: [0, 450, 0, 160],
      header: { image: 'headerbanner' },
      footer: function (currentPage: any, pageCount: any) {
        return {
          text: 'Page | ' + currentPage,
          fontSize: 40,
          alignment: 'right',
          margin: [0, 0, 170, 0],
        };
      },
      content: [
        // {
        //   image: 'headerbanner',
        //   fit: [2600, 2600],
        //   alignment: 'center',
        // },

        //MAIN INVOICE SECTION//

        {
          text: 'Invoice',
          margin: [0, 49.5, 0, 0],
          alignment: 'center',
          fontSize: '98',
          bold: true,
        },
        {
          //CLIENT DETAILS
          columns: [
            [
              {
                text: 'Albert Heijn',
                fontSize: 50,
                bold: true,
                margin: [170, 0, 0, 5],
              },
              {
                text: 'Sakina Abbas',
                fontSize: 40,
                margin: [170, 0, 0, 5],
              },
              {
                text: '{{Addresss}}',
                fontSize: 40,
                margin: [170, 0, 0, 5],
              },
              {
                text: '{{Phone Number}} | {{contact email}}',
                fontSize: 40,
                margin: [170, 0, 0, 5],
              },
            ],
            [
              {
                text: 'Date',
                alignment: 'right',
                fontSize: 40,
                margin: [0, 0, 170, 5],
              },
              {
                text: 'Customer Number',
                alignment: 'right',
                fontSize: 40,
                margin: [0, 0, 170, 5],
              },
              {
                text: 'Invoice Number',
                fontSize: 40,
                alignment: 'right',
                margin: [0, 0, 170, 0],
              },
            ],
          ],
        },

        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 60,
              x2: 3508,
              y2: 60,
              lineWidth: 1,
            },
          ],
        },
        {
          columns: [
            {
              text: 'Calculations',
              fontSize: 60,
              bold: true,
              margin: [170, 36.5, 0, 32.5],
            },
            {
              text: 'Invoice Period',
              alignment: 'right',
              fontSize: 40,
              margin: [0, 49.5, 170, 0],
            },
          ],
        },

        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: 3508,
              y2: 0,
              lineWidth: 1,
            },
          ],
        },

        {
          //TOTAL ORDERS
          columns: [
            {
              margin: [170, 75.5, 0, 102],
              width: '70%',
              text: 'Total Orders = 56  |  Total Order Amount = € 786.14',
              fontSize: 40,
            },
            {
              margin: [170, 75.5, 0, 102],
              width: '10%',
              text: '',
              fontSize: 40,
            },
            {
              margin: [170, 75.5, 0, 0],
              width: '20%',
              text: '',
              fontSize: 40,
            },
          ],
        },
        {
          columns: [
            {
              //SERVICE FEES
              margin: [170, 0, 0, 0],
              width: '70%',
              text: '7% (Daily2you Service fee) of Total Order Amount = € 786.14 ',
              fontSize: 40,
            },
            {
              margin: [170, 0, 0, 0],
              width: '10%',
              text: '€',
              fontSize: 40,
            },
            {
              margin: [0, 0, 170, 0],
              alignment: 'right',
              width: '20%',
              text: '55.02',
              fontSize: 40,
            },
          ],
        },

        {
          canvas: [
            {
              type: 'line',
              x1: 1970,
              y1: 48.5,
              x2: 2410,
              y2: 48.5,
              lineWidth: 1,
            },
          ],
        },

        {
          columns: [
            {
              //ADMINISTRATION FEE
              margin: [170, 48.5, 0, 0],
              width: '70%',
              text: '€  0.19 (Administration fee / Order)  | Total Orders = 56  |  €  0.19 X 56 ',
              fontSize: 40,
            },
            {
              margin: [170, 48.5, 0, 0],
              width: '10%',
              text: '€',
              fontSize: 40,
            },
            {
              margin: [0, 49, 170, 0],
              alignment: 'right',
              width: '20%',
              text: '10.64',
              fontSize: 40,
            },
          ],
        },

        {
          canvas: [
            {
              type: 'line',
              x1: 1970,
              y1: 48.5,
              x2: 2410,
              y2: 48.5,
              lineWidth: 1,
            },
          ],
        },

        {
          columns: [
            {
              //FAST DELIVERY CHARGES
              margin: [170, 48.5, 0, 0],
              width: '70%',
              text: '€  7.00 (Fast Delivery Charges)  |  Total Fast Delivery Orders = 25  |  €  7.00 X 25 ',
              fontSize: 40,
            },
            {
              margin: [170, 48.5, 0, 0],
              width: '10%',
              text: '€',
              fontSize: 40,
            },
            {
              margin: [0, 49, 170, 0],
              alignment: 'right',
              width: '20%',
              text: '175',
              fontSize: 40,
            },
          ],
        },

        {
          columns: [
            {
              //NORMAL DELIVERY CHARGES
              margin: [170, 49, 0, 0],
              width: '70%',
              text: '€  4.00 (Normal Delivery Charges)  |  Total Fast Delivery Orders = 15  |  €  4.00 X 15 ',
              fontSize: 40,
            },
            {
              margin: [170, 49, 0, 0],
              width: '10%',
              text: '€',
              fontSize: 40,
            },
            {
              margin: [0, 49, 170, 0],
              alignment: 'right',
              width: '20%',
              text: '60',
              fontSize: 40,
            },
          ],
        },

        {
          canvas: [
            {
              type: 'line',
              x1: 1970,
              y1: 48.5,
              x2: 2410,
              y2: 48.5,
              lineWidth: 1,
            },
          ],
        },

        {
          columns: [
            {
              //SUBTOTAL AMOUNT OF INVOICE
              margin: [170, 49, 0, 0],
              width: '70%',
              text: 'Subtotal amount of this invoice',
              fontSize: 40,
            },
            {
              margin: [170, 49, 0, 0],
              width: '10%',
              text: '€',
              fontSize: 40,
            },
            {
              margin: [0, 49, 170, 0],
              alignment: 'right',
              width: '20%',
              text: '300.84',
              fontSize: 40,
            },
          ],
        },

        {
          canvas: [
            {
              type: 'line',
              x1: 1970,
              y1: 48.5,
              x2: 2410,
              y2: 48.5,
              lineWidth: 1,
            },
          ],
        },

        {
          columns: [
            {
              //TAX
              margin: [170, 49, 0, 0],
              width: '70%',
              text: '21% (TAX) Deduction  |  21% of 300.84',
              fontSize: 40,
            },
            {
              margin: [170, 49, 0, 0],
              width: '10%',
              text: '€',
              fontSize: 40,
            },
            {
              margin: [0, 49, 170, 0],
              alignment: 'right',
              width: '20%',
              text: '63.17',
              fontSize: 40,
            },
          ],
        },

        {
          canvas: [
            {
              type: 'line',
              x1: 1970,
              y1: 48.5,
              x2: 2410,
              y2: 48.5,
              lineWidth: 1,
            },
          ],
        },

        {
          columns: [
            {
              //ONLINE PAYMENT SETTLEMENT
              margin: [170, 49, 0, 0],
              width: '70%',
              text: 'Settled with online payments received',
              fontSize: 40,
            },
            {
              margin: [170, 49, 0, 0],
              width: '10%',
              text: '€',
              fontSize: 40,
            },
            {
              margin: [0, 49, 170, 0],
              alignment: 'right',
              width: '20%',
              text: '364.01',
              fontSize: 40,
            },
          ],
        },

        {
          canvas: [
            {
              type: 'line',
              x1: 1970,
              y1: 48.5,
              x2: 2410,
              y2: 48.5,
              lineWidth: 1,
            },
          ],
        },

        {
          columns: [
            {
              margin: [170, 49, 0, 0],
              width: '70%',
              text: 'Settled with online payments received',
              fontSize: 40,
              bold: true,
            },
            {
              margin: [170, 49, 0, 0],
              width: '10%',
              text: '€',
              fontSize: 40,
            },
            {
              margin: [0, 49, 170, 0],
              alignment: 'right',
              width: '20%',
              text: '0.00',
              fontSize: 40,
            },
          ],
        },

        {
          canvas: [
            {
              type: 'line',
              x1: 170,
              y1: 48.5,
              x2: 2410,
              y2: 48.5,
              lineWidth: 1,
            },
          ],
        },

        {
          //INVOICE PERIOD
          text: 'Your turnover for the period 04-05-2021 to 04-06-2021: € 786.14',
          fontSize: 40,
          margin: [170, 102.5, 0, 0],
          pageBreak: 'after',
        },

        //SPECIFICAIIONS FAST DELIVERY SECTION//

        {
          text: 'Specifications',
          bold: 'true',
          fontSize: 98,
          margin: [0, 49.5, 0, 0],
          alignment: 'center',
        },

        {
          text: 'Vendor Name: Albert',
          fontSize: 40,
          margin: [170, 80, 0, 0],
        },
        {
          text: 'Invoice Period',
          fontSize: 40,
          margin: [170, 80, 0, 0],
        },

        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 115.5,
              x2: 2580,
              y2: 115.5,
              lineWidth: 1,
            },
          ],
        },

        {
          columns: [
            {
              text: 'Fast Delivery Orders',
              fontSize: 60,
              bold: 'true',
              margin: [170, 36.5, 0, 0],
            },
            {
              text: 'Total Fast Deliveries: 25',
              fontSize: 40,
              margin: [0, 49.5, 170, 0],
              alignment: 'right',
            },
          ],
        },

        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 32.5,
              x2: 2580,
              y2: 32.5,
              lineWidth: 1,
            },
          ],
        },

        {
          columns: [[columnElement1], [columnElement2]],
        },



        //SPECIFICAIIONS NORMAL DELIVERY SECTION//

        {
          pageBreak: 'before',
          text: 'Specifications',
          bold: 'true',
          fontSize: 98,
          margin: [0, 49.5, 0, 0],
          alignment: 'center',
        },

        {
          text: 'Vendor Name: Albert',
          fontSize: 40,
          margin: [170, 80, 0, 0],
        },
        {
          text: 'Invoice Period',
          fontSize: 40,
          margin: [170, 80, 0, 0],
        },

        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 115.5,
              x2: 2580,
              y2: 115.5,
              lineWidth: 1,
            },
          ],
        },

        {
          columns: [
            {
              text: 'Normal Delivery Orders',
              fontSize: 60,
              bold: 'true',
              margin: [170, 36.5, 0, 0],
            },
            {
              text: 'Total Normal Deliveries: 25',
              fontSize: 40,
              margin: [0, 49.5, 170, 0],
              alignment: 'right',
            },
          ],
        },

        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 32.5,
              x2: 2580,
              y2: 32.5,
              lineWidth: 1,
            },
          ],
        },

        {
          columns: [[columnElement3], [columnElement4]],
        },
      ],
      pageSize: {
        width: 2580,
        height: 3508,
      },
      styles: {
        header: {
          fontSize: 98,
          bold: true,
          alignment: 'center',
          margin: [0, 15, 0, 15],
        },
      },
      images: img,
    };
    pdfMake.createPdf(docDefinition).open();
  }
}
