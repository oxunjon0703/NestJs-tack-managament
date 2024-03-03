import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTaskDto } from './create-user-task.dto';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ID } from 'src/common/types/type';
import { StatusEnum } from 'src/common/enums/enum';

const Status = [StatusEnum.done, StatusEnum.process];

export class UpdateUserTaskDto extends PartialType(CreateUserTaskDto) {
  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  user_id: ID;

  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  task_id: ID;

  @ApiProperty({
    type: Date,
  })
  @IsNotEmpty()
  start_at: Date;

  @ApiProperty({
    type: Date,
  })
  @IsNotEmpty()
  end_at: Date;

  @ApiProperty({
    type: String,
  })
  @IsEnum(Status)
  @IsNotEmpty()
  status: StatusEnum;

  started_date: Date;
  ended_date: Date;
  created_at: Date;
  last_updated_at: Date;
  created_by: ID;
  last_updated_by: ID;
}
