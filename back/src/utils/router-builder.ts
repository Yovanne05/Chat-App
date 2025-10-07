import { Router, RequestHandler } from "express";

export class RouterBuilder {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  private wrap(handler: RequestHandler): RequestHandler {
    return async (req, res, next) => {
      try {
        await handler(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  }

  get(path: string, ...handlers: RequestHandler[]): this {
    this.router.get(path, ...handlers.map((h) => this.wrap(h)));
    return this;
  }

  post(path: string, ...handlers: RequestHandler[]): this {
    this.router.post(path, ...handlers.map((h) => this.wrap(h)));
    return this;
  }

  put(path: string, ...handlers: RequestHandler[]): this {
    this.router.put(path, ...handlers.map((h) => this.wrap(h)));
    return this;
  }

  patch(path: string, ...handlers: RequestHandler[]): this {
    this.router.patch(path, ...handlers.map((h) => this.wrap(h)));
    return this;
  }

  delete(path: string, ...handlers: RequestHandler[]): this {
    this.router.delete(path, ...handlers.map((h) => this.wrap(h)));
    return this;
  }

  build(): Router {
    return this.router;
  }
}
