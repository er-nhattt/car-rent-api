import { Body, Controller, HttpCode, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { UpdateFavouriteStatusDto } from './dto/update-favourite-status.dto';
import { FavouritesService } from './favourites.service';

@ApiTags('Favourites')
@Controller({
  path: 'favourites',
})
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Put()
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async favouriteCarByUser(
    @Body() updateFavouriteStatusDto: UpdateFavouriteStatusDto,
    @CurrentUser() user: User,
  ) {
    await this.favouritesService.updateFavouriteStatus(
      updateFavouriteStatusDto,
      user,
    );
  }
}
