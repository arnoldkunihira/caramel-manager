import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ name: "first_name", type: "varchar", length: 50 })
    firstName: string;

    @Index()
    @Column({ name: "last_name", type: "varchar", length: 50 })
    lastName: string;

    @Index({ unique: true })
    @Column({ name: "email", type: "varchar", length: 100 })
    email: string;

    @Column({ name: "gender", type: "varchar", length: 50 })
    gender: string;

    @Column({ name: "phone_number", type: "varchar", length: 50 })
    phoneNumber: string;

    @Column({ name: "job_title", type: "varchar", length: 100 })
    jobTitle?: string;

    @CreateDateColumn({ name: "created_at", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}
