import { Controller } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';

@Controller()
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}
}
