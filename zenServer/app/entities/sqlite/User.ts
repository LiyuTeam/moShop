import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account: string;

  @Column({
    default: null,
  })
  password?: string;

  @Column({
    default: null,
  })
  user_name?: string;

  @Column({
    default: null,
  })
  is_admin?: boolean;

  @Column({
    default: null,
  })
  status?: 1 | 2 | 3

}

export default User;
