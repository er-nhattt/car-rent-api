import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/common/interceptors/tranform-interceptor';
import { GetPaymentMethodDto } from './dto/get-payment-methods.dto';
import { PaymentMethodsDto } from './dto/payment-methods.dto';
import { PaymentMethodsService } from './payment-methods.service';

@ApiTags('Payment methodss')
@Controller({
  path: 'payment-methods',
})
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Get('')
  @Serialize(PaymentMethodsDto)
  async getPaymentMethods(@Query() getPaymentMethodDto: GetPaymentMethodDto) {
    const result = await this.paymentMethodsService.getPaymentMethods(
      getPaymentMethodDto,
    );
    return result;
  }
}
