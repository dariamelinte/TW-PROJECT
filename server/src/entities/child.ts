import { randomUUID } from "crypto";
import { Pool } from "pg";

export interface IChild {
  id?: string;
  familyId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender?: string;
  nationality?: string;
  weight?: number;
  height?: number;
}

export default class ChildEntity {
  public id?: string;
  public familyId: string;
  public firstName: string;
  public lastName: string;
  public dateOfBirth: Date;
  public gender?: string;
  public nationality?: string;
  public weight?: number;
  public height?: number;

  constructor(data: IChild) {
    this.id = data.id;
    this.familyId = data.familyId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.dateOfBirth = data.dateOfBirth;
    this.gender = data.gender;
    this.nationality = data.nationality;
    this.weight = data.weight;
    this.height = data.height;
  }

  public async save(pool: Pool): Promise<IChild | null> {
    try {
      await pool.query(`
        INSERT INTO TABLE child
          (id, familyId, firstName, lastName, dateOfBirth, gender, nationality, weight, height)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [
        randomUUID(),
        this.familyId,
        this.firstName,
        this.lastName,
        this.dateOfBirth,
        this.gender,
        this.nationality,
        this.weight,
        this.height
      ]);
      return this;
    } catch (err) {
      console.error(err);
      return null;     
    }
  }

  public async update(pool: Pool): Promise<IChild | null> {
    try {
      await pool.query(`
        UPDATE child
        SET
          firstName = $1,
          lastName = $2,
          dateOfBirth = $3,
          gender = $4,
          nationality = $5,
          weight = $6,
          height = $7
        WHERE
          id = $8
        `, [
        this.firstName,
        this.lastName,
        this.dateOfBirth,
        this.gender,
        this.nationality,
        this.weight,
        this.height,
        this.id
      ]);
      return this;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public async delete(pool: Pool): Promise<IChild | null> {
    try {
      await pool.query(`
        DELETE FROM child
        WHERE
          id = $1
        `, [
        this.id
      ]);
      return this;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public static async getById(id: string, pool: Pool): Promise<IChild | null> {
    try {
      const result = await pool.query(`
        SELECT * FROM child
        WHERE
          id = $1
        `, [
        id
      ]);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public static async getByFamilyId(familyId: string, pool: Pool): Promise<IChild[] | null> {
    try {
      const result = await pool.query(`
        SELECT * FROM child
        WHERE
          familyId = $1
        `, [
        familyId
      ]);
      return result.rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}