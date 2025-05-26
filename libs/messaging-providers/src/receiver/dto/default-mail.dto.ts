// {
// 	notificationType: 'Received',
// 	mail: {
// 	  timestamp: '2025-05-26T18:32:56.887Z',
// 	  source: 'andres.correa@designli.co',
// 	  messageId: 'mn8h7b1kcr6g05k4c9oi3ifc6f97juvef45pj9o1',
// 	  destination: [ 'deca.test@designli.io' ],
// 	  headersTruncated: false,
// 	  headers: [
// 		[Object], [Object], [Object],
// 		[Object], [Object], [Object],
// 		[Object], [Object], [Object],
// 		[Object], [Object], [Object],
// 		[Object], [Object], [Object],
// 		[Object], [Object], [Object],
// 		[Object], [Object], [Object],
// 		[Object], [Object]
// 	  ],
// 	  commonHeaders: {
// 		returnPath: 'andres.correa@designli.co',
// 		from: [Array],
// 		date: 'Mon, 26 May 2025 13:32:44 -0500',
// 		to: [Array],
// 		messageId: '<CADpPHfsnENJBbYJuQNUt+=piBfOrNYwoOxB+S_qmyQTiWLmTjA@mail.gmail.com>',
// 		subject: 'test'
// 	  }
// 	},
// 	receipt: {
// 	  timestamp: '2025-05-26T18:32:56.887Z',
// 	  processingTimeMillis: 368,
// 	  recipients: [ 'deca.test@designli.io' ],
// 	  spamVerdict: { status: 'PASS' },
// 	  virusVerdict: { status: 'PASS' },
// 	  spfVerdict: { status: 'PASS' },
// 	  dkimVerdict: { status: 'PASS' },
// 	  dmarcVerdict: { status: 'PASS' },
// 	  action: {
// 		type: 'S3',
// 		topicArn: 'arn:aws:sns:us-east-1:617972789185:deca-messages-dev',
// 		bucketName: 'deca-info',
// 		objectKeyPrefix: 'messages',
// 		objectKey: 'messages/mn8h7b1kcr6g05k4c9oi3ifc6f97juvef45pj9o1'
// 	  }
// 	}
//   }

export class CommonHeadersDto {
  returnPath?: string;
  from?: string[];
  date?: string;
  to?: string[];
  messageId?: string;
  subject?: string;
}

export class MailHeadersDto {
  name: string;
  value: string;
}

export class MailDto {
  timestamp?: string;
  source: string;
  messageId: string;
  destination?: string[];
  headersTruncated?: boolean;
  headers?: Array<MailHeadersDto>;
  commonHeaders?: CommonHeadersDto;
}

export class actionDto {
  type: string;
  topicArn: string;
  bucketName: string;
  objectKeyPrefix: string;
  objectKey: string;
}

export class statusDto {
  status: string;
}

export class ReceiptDto {
  timestamp: string;
  processingTimeMillis: number;
  recipients: string[];
  spamVerdict: statusDto;
  virusVerdict: statusDto;
  spfVerdict: statusDto;
  dkimVerdict: statusDto;
  dmarcVerdict: statusDto;
  action: actionDto;
}

export class DefaultMailDto {
  notificationType: string;
  mail: MailDto;
  receipt: ReceiptDto;
}
