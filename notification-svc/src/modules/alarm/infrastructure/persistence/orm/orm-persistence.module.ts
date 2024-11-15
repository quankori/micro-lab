import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmEntity } from './entities/alarm.entity';
import { CreateAlarmRepository } from 'src/modules/alarm/application/ports/create-alarm.repository';
import { OrmAlarmRepository } from './repositories/create-alarm.repository';
import { AlarmItemEntity } from './entities/alaram-item.entity';
import { FindAlarmRepository } from 'src/modules/alarm/application/ports/find-alarm.repository';
import { UpsertMaterializedAlarmRepository } from 'src/modules/alarm/application/ports/upsert-materialized-alarm.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MaterializedAlarmView,
  MaterializedAlarmViewSchema,
} from './schemas/materialized-alarm-view.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity]),
    MongooseModule.forFeature([
      { name: MaterializedAlarmView.name, schema: MaterializedAlarmViewSchema },
    ]),
  ],
  providers: [
    {
      provide: CreateAlarmRepository,
      useClass: OrmAlarmRepository,
    },
    {
      provide: FindAlarmRepository,
      useClass: OrmAlarmRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useClass: OrmAlarmRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmRepository,
    UpsertMaterializedAlarmRepository,
  ],
})
export class OrmAlarmPersistenceModule {}
