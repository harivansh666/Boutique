import type { Response } from "express";

interface ResponseHandlerOptions {
  statusCode: number;
  data?: any;
  success?: boolean;
  timestamp?: string;
}

class ResponseHandler {
  public statusCode: number;
  public data: any;
  public success: boolean;
  public timestamp: string; // eh sirf runtime vich define honi aa

  // ithe asi object de type define kr rahe aa jo asi frontend te send krna aa.
  constructor({ statusCode = 200, data = {} }: ResponseHandlerOptions) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }

  // ✅ Static method - clean and clear intent

  static send(res: Response, options: ResponseHandlerOptions) {
    const handler = new ResponseHandler(options);
    return res.status(handler.statusCode).json(handler);
  }
}

export default ResponseHandler;
