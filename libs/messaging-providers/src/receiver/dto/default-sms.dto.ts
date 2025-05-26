// {
// 	"originationNumber":"+14255550182",
// 	"destinationNumber":"+12125550101",
// 	"messageKeyword":"JOIN",
// 	"messageBody":"EXAMPLE",
// 	"inboundMessageId":"cae173d2-66b9-564c-8309-21f858e9fb84",
// 	"previousPublishedMessageId":"wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
//   }

export class DefaultSmsDto {
  originationNumber: string;
  destinationNumber: string;
  messageKeyword: string;
  messageBody: string;
  inboundMessageId: string;
  previousPublishedMessageId: string;
}
