import { Inject, Injectable, ConsoleLogger, Scope } from "@nestjs/common";
import { createLogger, LoggerOptions, Logger as WinstonLogger } from "winston";
import { NESTJS_WINSTON_CONFIG_OPTIONS } from "./nestjs-winston-logger.constants";

export type LoggerContext = {
  service?:string,
  context?:string,
  [key:string]:string | number | boolean
}

@Injectable({ scope: Scope.TRANSIENT })
export class NestjsWinstonLoggerService extends ConsoleLogger {
  private logger: WinstonLogger;

  constructor(@Inject(NESTJS_WINSTON_CONFIG_OPTIONS) config: LoggerOptions) {
    super();
    this.logger = createLogger(config);
  }

  setContext(context: string | LoggerContext) {
    if (typeof context === 'string') {
      this.logger.defaultMeta = {
        ...this.logger.defaultMeta,
        service: context,
      };
      return;
    }

    this.logger.defaultMeta = {
      ...this.logger.defaultMeta,
      ...context
    };
  }

  appendDefaultMeta(key: string, value: string) {
    this.logger.defaultMeta = {
      ...this.logger.defaultMeta,
      [key]: value,
    };
  }

  log(message: string) {
    this.logger.info(message);
  }
  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }
  warn(message: string) {
    this.logger.warn(message);
  }
  debug(message: string) {
    this.logger.debug(message);
  }
  verbose(message: string) {
    this.logger.verbose(message);
  }
}
