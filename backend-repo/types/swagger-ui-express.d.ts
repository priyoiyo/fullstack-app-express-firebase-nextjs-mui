declare module 'swagger-ui-express' {
    import { RequestHandler } from 'express';
    import { JsonObject } from 'swagger-ui-express';
  
    export function serve(req: any, res: any, next: any): void;
    export function setup(
      swaggerDoc: JsonObject,
      opts?: {
        explorer?: boolean;
        swaggerOptions?: { [key: string]: any };
        customCss?: string;
        customJs?: string;
        customfavIcon?: string;
        customSiteTitle?: string;
      },
      options?: { [key: string]: any },
      swaggerOptions?: { [key: string]: any }
    ): RequestHandler;
  }
  