import { MongodbEntity } from '../../../types/unitType';
import { Column, Entity, ManyToOne } from 'typeorm';
import DictionaryEntity from './DictionaryEntity';

@Entity({ name: 'DictionaryValue' })
class DictionaryValueEntity extends MongodbEntity implements DictionaryValueEntityType {
  @ManyToOne(() => DictionaryEntity, dictionary => dictionary.uid)
  fkDict: DictionaryEntity;
  @Column({ comment: '' }) id: any;
  @Column({ comment: '' }) name: string;
  @Column({ comment: '' }) title: string | null;
  @Column({ comment: '' }) value: any;
  @Column({ comment: '' }) valueType: number;

}

export default DictionaryValueEntity;
