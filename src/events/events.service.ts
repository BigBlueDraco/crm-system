import { EmployeeService } from '@/employee/employee.service';
import { PrismaService } from '@/prisma/service/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvent } from './types/create-event';
import { ResponseEvent } from './types/response-event';
import { UpdateEvent } from './types/update-event';

@Injectable()
export class EventsService {
  private readonly includeSchema = {
    memebers: { include: { user: true } },
    owner: { include: { user: true } },
  };
  constructor(
    private readonly prismaService: PrismaService,
    private readonly employeeService: EmployeeService,
  ) {}
  private eventMaping(events: any[]): ResponseEvent[] {
    return events.map(
      ({ ownerId, memebers, owner: { user, ...owner }, ...event }) => {
        const eventMembers = memebers.map(({ user }) => {
          user;
        });
        return {
          ...event,
          memebers: { ...eventMembers },
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
      const { ownerId, ...data } = createEvent;
      await this.checkOwnerExist(ownerId);
      const event = await this.prismaService.event.create({
        data: { ...data, owner: { connect: { id: ownerId } } },
        include: this.includeSchema,
      });
      return this.eventMaping([event])[0];
    } catch (err) {
      return err;
    }
  }

  async findAll(): Promise<ResponseEvent[]> {
    try {
      const event = await this.prismaService.event.findMany({
        include: this.includeSchema,
      });
      return this.eventMaping([event]);
    } catch (err) {
      return err;
    }
  }

  async findOne(id: number): Promise<ResponseEvent> {
    try {
      const event = await this.prismaService.event.findUnique({
        where: { id },
        include: this.includeSchema,
      });
      return this.eventMaping([event])[0];
    } catch (err) {
      return err;
    }
  }

  async update(id: number, updateEvent: UpdateEvent): Promise<ResponseEvent> {
    try {
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
      return err;
    }
  }

  async remove(id: number): Promise<ResponseEvent> {
    try {
      const event = await this.prismaService.event.delete({
        where: { id },
        include: this.includeSchema,
      });
      return this.eventMaping([event])[0];
    } catch (err) {
      return err;
    }
  }
}
