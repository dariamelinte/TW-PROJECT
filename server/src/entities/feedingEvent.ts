import { randomUUID } from "crypto";
import { Pool } from "pg";

export interface IFeedingEvent {
  id?: string;
  childId: string;
  dateTime: Date;
  note: string;
}

export default class FeedingEventEntity {
  public id?: string;
  public childId: string;
  public dateTime: Date;
  public note: string;

  constructor(data: IFeedingEvent) {
    this.id = data.id;
    this.childId = data.childId;
    this.dateTime = data.dateTime;
    this.note = data.note;
  }

  public async save(pool: Pool): Promise<IFeedingEvent | null> {
    try {
      await pool.query(`
        INSERT INTO TABLE feeding_calendar
          (id, childId, dateTime, note)
        VALUES
          ($1, $2, $3, $4)
        `, [
        randomUUID(),
        this.childId,
        this.dateTime,
        this.note
      ]);
      return this;
    } catch (err) {
      console.error(err);
      return null;     
    } 
  }

  public async update(pool: Pool): Promise<IFeedingEvent | null> {
    try {
      await pool.query(`
        UPDATE feeding_calendar
        SET
          childId = $1,
          dateTime = $2,
          note = $3
        WHERE id = $4
        `, [
        this.childId,
        this.dateTime,
        this.note,
        this.id
      ]);
      return this;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public static async getFeedingCalendar(pool: Pool, childId: string): Promise<IFeedingEvent[] | null> {
    try {
      const result = await pool.query(`
        SELECT * FROM feeding_calendar
        WHERE childId = $1
        `, [childId]);
      return result.rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public static async deleteFeedingEvent(pool: Pool, id: string): Promise<IFeedingEvent | null> {
    try {
      const result = await pool.query(`
        DELETE FROM feeding_calendar
        WHERE id = $1
        `, [id]);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}