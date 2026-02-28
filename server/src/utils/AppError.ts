class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  timestamp: Date;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.timestamp = new Date();

    Error.captureStackTrace(this, this.constructor);
  }
}
