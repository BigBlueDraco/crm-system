import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvent } from './types/create-event';
import { ResponseEvent } from './types/response-event';
import { UpdateEvent } from './types/update-event';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class EventsService {
  private readonly includeSchema = {
    members: { include: { user: true } },
    owner: { include: { user: true } },
  };
  constructor(
    private readonly prismaService: PrismaService,
    private readonly employeeService: EmployeeService,
  ) {}
  private eventMaping(events: any[]): ResponseEvent[] {
    return events.map(
      ({ ownerId, members, owner: { user, ...owner }, ...event }) => {
        return {
          ...event,
          members: members.map(({ user }) => user),
          owner: { ...user, ...owner },
        };
      },
    );
  }
  private async checkOwnerExist(ownerId: number) {
    const isOwnerExist = await this.employeeService.findOne(ownerId);
    if (!isOwnerExist) {
      throw new NotFoundException(`Owner with id: ${ownerId} not found`);
    }
  }
  async create(createEvent: CreateEvent): Promise<ResponseEvent> {
    try {
      const { ownerId, memberIds, ...data } = createEvent;
      const members = memberIds.map((id) => ({
        userId: id,
      }));
      await this.checkOwnerExist(ownerId);
      const event = await this.prismaService.event.create({
        data: {
          ...data,
          members: {
            create: members,
          },
          owner: { connect: { id: ownerId } },
        },
        include: this.includeSchema,
      });
      return this.eventMaping([event])[0];
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<ResponseEvent[]> {
    try {
      const event = await this.prismaService.event.findMany({
        include: this.includeSchema,
      });
      return this.eventMaping(event);
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number): Promise<ResponseEvent> {
    try {
      const event = await this.prismaService.event.findUnique({
        where: { id },
        include: this.includeSchema,
      });
      if (!event) {
        throw new NotFoundException(`even with id: ${id} not found`);
      }
      return this.eventMaping([event])[0];
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updateEvent: UpdateEvent): Promise<ResponseEvent> {
    try {
      await this.findOne(id);
      const { ownerId, ...data } = updateEvent;
      await this.checkOwnerExist(ownerId);
      const event = await this.prismaService.event.update({
        where: { id: id },
        data: {
          ...data,
          owner: {
            connect: { id: ownerId },
          },
        },
        include: this.includeSchema,
      });
      return this.eventMaping([event])[0];
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number): Promise<ResponseEvent> {
    try {
      await this.findOne(id);
      const event = await this.prismaService.event.delete({
        where: { id },
        include: this.includeSchema,
      });
      return this.eventMaping([event])[0];
    } catch (err) {
      throw err;
    }
  }
}
