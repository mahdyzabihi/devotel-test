import {
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	// PrimaryGeneratedColumn,
} from 'typeorm';

export class BaseEntity {
	// @PrimaryGeneratedColumn('increment', { unsigned: true })
	// id: number;

	@CreateDateColumn({
		type: 'timestamp',
		nullable: false,
		default: () => 'NOW()',
	})
	created_date: Date;

	@UpdateDateColumn({
		type: 'timestamp',
		nullable: true,
	})
	updated_date: Date | null;

	@DeleteDateColumn({
		type: 'timestamp',
		nullable: true,
	})
	deleted_date: Date | null;
}
