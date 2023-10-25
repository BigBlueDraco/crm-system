import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRole } from './types/create-role';
import { UpdateRole } from './types/update-role';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { RightsService } from 'src/rights/rights.service';
import { RightOnRoleService } from 'src/right-on-role/right-on-role.service';
import { ResponseRole } from './types/response-role';

@Injectable()
export class RoleService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly rightsService: RightsService,
    private readonly rightsOnRoleService: RightOnRoleService,
  ) {}
  private rightsMaping(rightOnRole: any[]) {
    return rightOnRole.map((elem) => {
      return { ...elem.right };
    });
  }
  private roleMaping(roles: any[]) {
    return roles.map((elem) => {
      const { rights, ...role } = elem;
      return { ...role, rights: this.rightsMaping(rights) };
    });
  }

  async create(createRole: CreateRole): Promise<ResponseRole> {
    try {
      const { rightsIds, ...data } = createRole;
      const existingRights = await this.rightsService.findManyById(
        createRole.rightsIds,
      );
      if (existingRights.length !== rightsIds.length) {
        throw new ConflictException(
          `Rights ids (${createRole.rightsIds}) dosent math to existing rights ids (${existingRights})`,
        );
      }
      const createRights = rightsIds.reduce<{ rightId: number }[]>(
        (acc, elem) => {
          acc.push({ rightId: +elem });
          return acc;
        },
        [],
      );
      const role = await this.prismaService.role.create({
        data: {
          ...data,
          rights: {
            create: createRights,
          },
        },
        include: {
          rights: {
            include: {
              right: true,
            },
          },
        },
      });

      return this.roleMaping([role])[0];
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<ResponseRole[]> {
    const roles = await this.prismaService.role.findMany({
      include: {
        rights: {
          include: {
            right: true,
          },
        },
      },
    });
    return this.roleMaping(roles);
  }

  async findOne(id: number): Promise<ResponseRole> {
    try {
      const role = await this.prismaService.role.findFirst({
        where: {
          id,
        },
        include: {
          rights: {
            include: {
              right: true,
            },
          },
        },
      });
      if (!role) {
        throw new NotFoundException(`Role with id: ${id} not found`);
      }
      return this.roleMaping([role])[0];
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updateRole: UpdateRole): Promise<ResponseRole> {
    try {
      await this.findOne(id);
      const { addRights, removeRights, ...updateRoleData } = updateRole;
      const currentRightsIds: any[] = (await this.findOne(id)).rights.map(
        (elem) => elem.id,
      );
      await this.prismaService.role.update({
        where: {
          id,
        },
        data: {
          ...updateRoleData,
        },
      });
      if (removeRights) {
        const rightsToDelete = currentRightsIds.filter((id) =>
          removeRights.includes(id),
        );
        await this.rightsOnRoleService.removeMany({
          roleIds: [id],
          rightsIds: rightsToDelete,
        });
      }
      if (addRights) {
        const rightsIdsToCreate = addRights.filter(
          (id) => !currentRightsIds.includes(id),
        );
        await this.rightsService.checkRightsExistInDB(rightsIdsToCreate);
        const rightsToCreate = rightsIdsToCreate.map((elem) => ({
          roleId: id,
          rightId: elem,
        }));
        await this.rightsOnRoleService.createMany(rightsToCreate);
      }
      const role = await this.findOne(id);

      return role;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number): Promise<ResponseRole> {
    try {
      await this.findOne(id);
      const role = await this.prismaService.role.delete({
        where: {
          id,
        },
      });
      return this.roleMaping([role])[0];
    } catch (err) {
      throw err;
    }
  }
}
