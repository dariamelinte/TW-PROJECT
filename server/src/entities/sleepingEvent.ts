import { randomUUID } from "crypto";
import { Pool } from "pg";

export interface ISleepingEvent {
  id?: string;
  childId: string;
  dateTime: Date;
  sleepType: string;
  note?: string;
}

export default class SleepingEventEntity {
  public id?: string;
  public childId: string;
  public dateTime: Date;
  public sleepType: string;
  public note?: string;

  constructor(data: ISleepingEvent) {
    this.id = data.id;
    this.childId = data.childId;
    this.dateTime = data.dateTime;
    this.sleepType = data.sleepType;
    this.note = data.note;
  }

  public async save(pool: Pool): Promise<ISleepingEvent | null> {
    try {
      await pool.query(`
        INSERT INTO TABLE sleeping_calendar
          (id, childId, dateTime, sleepType, note)
        VALUES
          ($1, $2, $3, $4, $5)
        `, [
        randomUUID(),
        this.childId,
        this.dateTime,
        this.sleepType,
        this.note
      ]);
      return this;
    } catch (err) {
      console.error(err);
      return null;     
    } 
  }

  public async update(pool: Pool): Promise<ISleepingEvent | null> {
    try {
      await pool.query(`
        UPDATE sleeping_calendar
        SET
          childId = $1,
          dateTime = $2,
          sleepType = $3,
          note = $4
        WHERE id = $5
        `, [
        this.childId,
        this.dateTime,
        this.sleepType,
        this.note,
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
        DELETE FROM sleeping_calendar
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

  public static async getSleepingCalendar(pool: Pool, childId: string): Promise<ISleepingEvent[] | null> {
    try {
      const result = await pool.query(`
        SELECT
          id,
          childId,
          dateTime,
          sleepType,
          note
        FROM sleeping_calendar
        WHERE childId = $1
        `, [
        childId
      ]);
      return result.rows;
    } catch (err) {
      console.error(err);
      return null;     
    } 
  }
}