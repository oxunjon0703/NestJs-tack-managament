import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ID } from 'src/common/types/type';

export class CreateTaskDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  company_id: ID;

  @ApiProperty({
    type: Number,
  })
  @IsInt()
  parent_id: ID;

  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  day: number;

  created_at: Date;
  last_updated_at: Date;
  created_by: ID;
  last_updated_by: ID;
}
