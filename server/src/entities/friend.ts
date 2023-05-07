import { randomUUID } from "crypto";
import { Pool } from "pg";

export interface IFriend {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  parentName?: string;
  parentContact?: string;
  howTheyMet?: string;
  relationship: string;
}

export default class FriendEntity {
  public id?: string;
  public firstName: string;
  public lastName: string;
  public dateOfBirth?: Date;
  public parentName?: string;
  public parentContact?: string;
  public howTheyMet?: string;
  public relationship: string;

  constructor(data: IFriend) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.dateOfBirth = data.dateOfBirth;
    this.parentName = data.parentName;
    this.parentContact = data.parentContact;
    this.howTheyMet = data.howTheyMet;
    this.relationship = data.relationship;
  }

  public async save(pool: Pool): Promise<IFriend | null> {
    try {
      await pool.query(`
        INSERT INTO TABLE friend
          (id, firstName, lastName, dateOfBirth, parentName, parentContact, howTheyMet, relationship)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [
        randomUUID(),
        this.firstName,
        this.lastName,
        this.dateOfBirth,
        this.parentName,
        this.parentContact,
        this.howTheyMet,
        this.relationship
      ]);
      return this;
    } catch (err) {
      console.error(err);
      return null;     
    }
  }

  public async update(pool: Pool): Promise<IFriend | null> {
    try {
      await pool.query(`
        UPDATE friend
        SET
          firstName = $1,
          lastName = $2,
          dateOfBirth = $3,
          parentName = $4,
          parentContact = $5,
          howTheyMet = $6,
          relationship = $7
        WHERE
          id = $8
        `, [
        this.firstName,
        this.lastName,
        this.dateOfBirth,
        this.parentName,
        this.parentContact,
        this.howTheyMet,
        this.relationship,
        this.id
      ]);
      return this;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public async delete(pool: Pool): Promise<boolean> {
    try {
      await pool.query(`
        DELETE FROM friend
        WHERE id = $1
        `, [
        this.id
      ]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public static async findById(pool: Pool, id: string): Promise<IFriend | null> {
    try {
      const res = await pool.query(`
        SELECT * FROM friend
        WHERE id = $1
        `, [
        id
      ]);
      return res.rows[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public static async findAll(pool: Pool, childId: string): Promise<IFriend[] | null> {
    try {
      const res = await pool.query(`
        SELECT * FROM friend
        WHERE childId = $1
        `, [
        childId
      ]);
      return res.rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}