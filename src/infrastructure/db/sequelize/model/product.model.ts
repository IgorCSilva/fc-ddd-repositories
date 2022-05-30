import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

// Customizando o nome da tabela a ser criada.
@Table({
  tableName: "products",
  timestamps: false
})
export default class ProductModel extends Model {

  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;
}