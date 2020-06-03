import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  account: string;

  @Column()
  password: string;

  @Column()
  user_name: string;

  @Column()
  is_admin: boolean;

  @Column()
  status: 1 | 2 | 3

}

export default User;
