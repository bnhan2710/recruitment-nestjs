import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Public, ResponseMessage } from '../decorator/customize';
import { User } from '../decorator/customize';
import { IUser } from '../users/users.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ResponseMessage('Create a new job')
  create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    return this.jobsService.create(createJobDto,user);
  }

  @Public()
  @Get()
  @ResponseMessage('Fetch list job with paginate')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs:string
  ) {
    return this.jobsService.findAll(+currentPage,+limit,qs);
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Get detail job')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update job')
  update(@Param('id') id: string, 
  @Body() updateJobDto: UpdateJobDto,
  @User() user:IUser) {
    return this.jobsService.update(id, updateJobDto,user);
  }

  @Delete(':id')
  @ResponseMessage('Remove job')
  remove(@Param('id') id: string, @User() user:IUser) {
    return this.jobsService.remove(id, user);
  }
}
