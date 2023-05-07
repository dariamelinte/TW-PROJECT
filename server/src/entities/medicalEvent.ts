import { randomUUID } from "crypto";
import { Pool } from "pg";

export interface IMedicalEvent {
  id?: string;
  childId: string;
  title: string;
  note?: string;
  date: Date;
  severity: string;
}

export default class MedicalEventEntity {
  public id?: string;
  public childId: string;
  public title: string;
  public note?: string;
  public date: Date;
  public severity: string;

  constructor(data: IMedicalEvent) {
    this.id = data.id;
    this.childId = data.childId;
    this.title = data.title;
    this.note = data.note;
    this.date = data.date;
    this.severity = data.severity;
  }

  public async save(pool: Pool): Promise<IMedicalEvent | null> {
    try {
      await pool.query(`
        INSERT INTO TABLE medical_history
          (id, childId, title, note, date, severity)
        VALUES
          ($1, $2, $3, $4, $5, $6)
        `, [
        randomUUID(),
        this.childId,
        this.title,
        this.note,
        this.date,
        this.severity
      ]);
      return this;
    } catch (err) {
      console.error(err);
      return null;     
    } 
  }

  public async update(pool: Pool): Promise<IMedicalEvent | null> {
    try {
      await pool.query(`
        UPDATE medical_history
        SET
          childId = $1,
          title = $2,
          note = $3,
          date = $4,
          severity = $5
        WHERE id = $6
        `, [
        this.childId,
        this.title,
        this.note,
        this.date,
        this.severity,
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
        DELETE FROM medical_history
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

  public static async get(pool: Pool, id: string): Promise<IMedicalEvent | null> {
    try {
      const result = await pool.query(`
        SELECT * FROM medical_history
        WHERE id = $1
        `, [
        id
      ]);
      if (result.rowCount === 0) {
        return null;
      }
      return new MedicalEventEntity(result.rows[0]);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}