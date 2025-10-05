import { Request, Response, NextFunction } from "express";
import winston from "winston";
import path from "path";
import fs from "fs";

export interface RequestWithTiming extends Request {
  startTime?: number;
  requestTime?: string;
}

export const initLogger = (logDir: string = "logs") => {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.printf(
        ({ timestamp, level, message }) =>
          `${timestamp} - ${level.toUpperCase()} - ${message}`
      )
    ),
    transports: [
      new winston.transports.File({
        filename: path.join(logDir, "app_info.log"),
        level: "info",
        maxsize: 10 * 1024 * 1024,
        maxFiles: 5,
        format: winston.format((info) => {
          return info.level === "info" ? info : false;
        })(),
      }),
      new winston.transports.File({
        filename: path.join(logDir, "app_error.log"),
        level: "error",
        maxsize: 10 * 1024 * 1024,
        maxFiles: 5,
      }),
    ],
  });

  return logger;
};

export const requestLogger = (
  req: RequestWithTiming,
  res: Response,
  next: NextFunction
) => {
  req.startTime = Date.now();
  req.requestTime = new Date().toISOString();

  const userAgent = req.headers["user-agent"] || "N/A";
  const logger = req.app.locals.logger;

  logger?.info(
    `[REQUEST] ${req.method} ${req.path} | User-Agent: ${userAgent.substring(
      0,
      50
    )}`
  );

  const originalSend = res.send;
  res.send = function (data: any): Response {
    const duration = (
      (Date.now() - (req.startTime || Date.now())) /
      1000
    ).toFixed(4);
    const contentLength = Buffer.byteLength(data || "", "utf8");

    let logMessage = `[RESPONSE] ${req.method} ${req.path} | Status: ${res.statusCode} | Duration: ${duration}s | Size: ${contentLength} bytes`;

    if (res.statusCode >= 200 && res.statusCode < 400) {
      logger?.info(logMessage);
    } else {
      try {
        const errorData = typeof data === "string" ? JSON.parse(data) : data;
        logMessage += ` | Error: ${JSON.stringify(errorData)}`;
      } catch {
        const errorText = String(data).substring(0, 200);
        logMessage += ` | Error: ${errorText}`;
      }
      logger?.error(logMessage);
    }

    return originalSend.call(this, data);
  };

  next();
};
