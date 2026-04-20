const { winston, formats } = require('@strapi/logger');
const TransportStream = require('winston-transport');
const { prettyPrint } = formats;

// Fake external transport (simulates Datadog, Sentry, etc.)
class FakeExternalTransport extends TransportStream {
  constructor(opts?: any) {
    super(opts);
  }
  log(info: any, callback: () => void) {
    console.log(`[EXTERNAL TRANSPORT] ${info.level}: ${info.message}`);
    callback();
  }
}

export default {
  transports: [
    new winston.transports.Console({
      level: 'http',
      format: prettyPrint({ timestamps: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    }),
    new FakeExternalTransport({ level: 'http' }),
  ],
};
