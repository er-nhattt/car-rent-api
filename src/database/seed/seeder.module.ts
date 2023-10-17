import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from 'src/config/database/mysql/typeorm.config';
import { SeedModule } from './seed.module';

import { Seeder } from './seeder';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmAsyncConfig), SeedModule],
  providers: [Seeder],
})
export class SeederModule {}
