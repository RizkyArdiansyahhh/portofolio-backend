import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { db } from '../../prisma/db';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  public db = db;
  private runtime: any;

  get project() {
    return this.db.orm.public.Project;
  }

  get user() {
    return this.db.orm.public.User;
  }

  async onModuleInit() {
    this.runtime = await this.db.connect({
      url: process.env.DATABASE_URL!,
    });
  }

  async onModuleDestroy() {
    if (this.runtime) {
      await this.runtime.close();
    }
  }
}
