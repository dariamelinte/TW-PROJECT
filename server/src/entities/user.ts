import { randomUUID } from "crypto";
import { Pool } from "pg";

export interface IUser {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender?: string;
  nationality?: string;
  familyId: string;
}

export default class UserEntity {
  public id?: string;
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public dateOfBirth: Date;
  public gender?: string;
  public nationality?: string;
  public familyId: string;

  constructor(data: IUser) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.dateOfBirth = data.dateOfBirth;
    this.gender = data.gender;
    this.nationality = data.nationality;
    this.familyId = data.familyId;
  }

  public async save(pool: Pool): Promise<IUser | null> {
    try{
      await pool.query(`
        INSERT INTO TABLE user 
          (id, email, password, firstName, lastName, dateOfBirth, gender, nationality, familyId)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [
        randomUUID(), 
        this.email, 
        this.password, 
        this.firstName,
        this.lastName,
        this.dateOfBirth,
        this.gender,
        this.nationality,
        randomUUID()
      ]);
      return this;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public async update(pool: Pool): Promise<IUser | null> {
    try{
      await pool.query(`
        UPDATE user SET
          firstName = $1,
          lastName = $2,
          dateOfBirth = $3,
          gender = $4,
          nationality = $5,
          familyId = $6
        WHERE id = $7
      `, [
        this.firstName,
        this.lastName,
        this.dateOfBirth,
        this.gender,
        this.nationality,
        this.familyId,
        this.id
      ]);
      return this;
    } catch (err) {
      console.error(err);
      return null;
    }
  }



  public static async findByEmail(pool: Pool, email: string): Promise<IUser | null> {
    try{
      const result = await pool.query(`
        SELECT * FROM user WHERE email = $1
      `, [email]);
      if(result.rows.length === 0) {
        return null;
      }
      return new UserEntity(result.rows[0]);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public static async findById(pool: Pool, id: string): Promise<IUser | null> {
    try{
      const result = await pool.query(`
        SELECT * FROM user WHERE id = $1
      `, [id]);
      if(result.rows.length === 0) {
        return null;
      }
      return new UserEntity(result.rows[0]);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public static async findByFamilyId(pool: Pool, familyId: string): Promise<IUser[] | null> {
    try{
      const result = await pool.query(`
        SELECT * FROM user WHERE familyId = $1
      `, [familyId]);
      if(result.rows.length === 0) {
        return null;
      }
      return result.rows.map((row) => new UserEntity(row));
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public static async deleteById(pool: Pool, id: string): Promise<boolean> {
    try{
      await pool.query(`
        DELETE FROM user WHERE id = $1
      `, [id]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}