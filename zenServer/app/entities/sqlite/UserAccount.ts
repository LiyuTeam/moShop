import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'UserAccount' })
class UserAccount extends BaseEntity implements UserAccountEntityType {

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

  @Column({ default: null, comment: '创建时间' })
  createdAt: Date;

  @Column({ default: null, comment: '更新时间' })
  updatedAt: Date;

  @Column({ default: null, comment: '用户昵称' })
  userName: string;
}


export default UserAccount;
