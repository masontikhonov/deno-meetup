class HttpClientError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = this.constructor.name;
  }
}

class OrderProcessingError extends Error {
  reason: 'external' | 'internal';

  constructor(
    message: string,
    reason: 'external' | 'internal',
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = this.constructor.name;
    this.reason = reason;
  }
}

class HttpError extends Error {
  status: number;

  constructor(message: string, status: number, options?: ErrorOptions) {
    super(message, options);
    this.name = this.constructor.name;
    this.status = status;
  }
}

class HttpClient {
  // deno-lint-ignore require-await
  async getOrderDetails() {
    try {
      throw new Error('500: Internal server error');
    } catch (error) {
      throw new HttpClientError('Unable to get order details', {
        cause: error,
      });
    }
  }
}

class OrderService {
  #httpClient = new HttpClient();

  async processOrder() {
    try {
      await this.#httpClient.getOrderDetails();
    } catch (error) {
      throw new OrderProcessingError(
        'Unable to process order: API error',
        'external',
        { cause: error },
      );
    }
  }
}

class OrderController {
  #service = new OrderService();

  async processOrder() {
    try {
      await this.#service.processOrder();
    } catch (error) {
      if (
        error instanceof OrderProcessingError && error.reason === 'external'
      ) {
        throw new HttpError('Service Unavailable', 503, { cause: error });
      }
      throw new HttpError('Internal server error', 500, { cause: error });
    }
  }
}

const fakeErrorHandler = async () => {
  try {
    await new OrderController().processOrder();
  } catch (error) {
    console.error(
      `[fakeErrorHandler]\n😱 Oops! Something went really wrong, will return ${error.status}\n`,
      error,
    );
  }
};

await fakeErrorHandler();
