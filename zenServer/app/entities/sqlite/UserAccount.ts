import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserAccountType } from '../../types/schemaType';

@Entity()
class UserAccount implements UserAccountType {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  account: string;

  @Column({ default: null })
  password: string;

  @Column({ default: null })
  user_name?: string;

  @Column({ default: null })
  status?: 1 | 2 | 3

  @Column({ default: null, comment: '是否管理员' })
  isAdmin: number;

  @Column({ default: null, comment: '手机' })
  phone: number;

  @Column({ default: null, comment: '用户秘钥' })
  secretToken: string;
  createdAt: Date;
  updatedAt: Date;
  userName: string;

}

export default UserAccount;
