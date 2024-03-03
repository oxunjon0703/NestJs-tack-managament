import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ID } from 'src/common/types/type';
import { StatusEnum } from 'src/common/enums/enum';

export class CreateUserTaskDto {
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
  //   @IsDate()
  @IsNotEmpty()
  start_at: Date;

  @ApiProperty({
    type: Date,
  })
  //   @IsDate()
  @IsNotEmpty()
  end_at: Date;

  @ApiProperty({
    type: String,
  })
  @IsEnum(StatusEnum)
  @IsNotEmpty()
  status: StatusEnum;

  started_date: Date;
  ended_date: Date;
  created_at: Date;
  last_updated_at: Date;
  created_by: ID;
  last_updated_by: ID;
}
