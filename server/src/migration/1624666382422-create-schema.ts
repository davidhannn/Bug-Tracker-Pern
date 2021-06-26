import {MigrationInterface, QueryRunner} from "typeorm";

export class createSchema1624666382422 implements MigrationInterface {
    name = 'createSchema1624666382422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "passwordHash" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `);
        await queryRunner.query(`CREATE TABLE "members" ("id" SERIAL NOT NULL, "projectId" uuid NOT NULL, "memberId" uuid, CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" uuid, "name" character varying(60), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "bugs_priority_enum" AS ENUM('Low', 'Medium', 'High')`);
        await queryRunner.query(`CREATE TABLE "bugs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "description" character varying NOT NULL, "priority" "bugs_priority_enum" NOT NULL DEFAULT 'Low', "isResolved" boolean NOT NULL DEFAULT false, "projectId" uuid NOT NULL, "createdById" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_dadac7f01b703d50496ae1d3e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_da3e8adedb86281bf9203b1b0ec" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_b8b1af4785a6d102a8704912178" FOREIGN KEY ("memberId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_f55144dc92df43cd1dad5d29b90" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bugs" ADD CONSTRAINT "FK_b2b8219ad96da5bb8df99c8ea39" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bugs" ADD CONSTRAINT "FK_953bc502117c756d7268995b358" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bugs" DROP CONSTRAINT "FK_953bc502117c756d7268995b358"`);
        await queryRunner.query(`ALTER TABLE "bugs" DROP CONSTRAINT "FK_b2b8219ad96da5bb8df99c8ea39"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_f55144dc92df43cd1dad5d29b90"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_b8b1af4785a6d102a8704912178"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_da3e8adedb86281bf9203b1b0ec"`);
        await queryRunner.query(`DROP TABLE "bugs"`);
        await queryRunner.query(`DROP TYPE "bugs_priority_enum"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "members"`);
        await queryRunner.query(`DROP INDEX "IDX_fe0bb3f6520ee0469504521e71"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
