import { randomUUID } from "crypto";
import { Pool } from "pg";

export interface IMultimediaResource {
  id?: string;
  childId: string;
  date: Date;
  note: string;
  path: string;
}

export default class MultimediaResourceEntity {
  public id?: string;
  public childId: string;
  public date: Date;
  public note: string;
  public path: string;

  constructor(data: IMultimediaResource) {
    this.id = data.id;
    this.childId = data.childId;
    this.date = data.date;
    this.note = data.note;
    this.path = data.path;
  }

  public async save(pool: Pool): Promise<IMultimediaResource | null> {
    try {
      await pool.query(`
        INSERT INTO TABLE multimedia_resources
          (id, childId, date, note, path)
        VALUES
          ($1, $2, $3, $4, $5)
        `, [
        randomUUID(),
        this.childId,
        this.date,
        this.note,
        this.path
      ]);
      return this;
    } catch (err) {
      console.error(err);
      return null;     
    } 
  }

  public async update(pool: Pool): Promise<IMultimediaResource | null> {
    try {
      await pool.query(`
        UPDATE multimedia_resources
        SET
          childId = $1,
          date = $2,
          note = $3,
          path = $4
        WHERE id = $5
        `, [
        this.childId,
        this.date,
        this.note,
        this.path,
        this.id
      ]);
      return this;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public async delete(pool: Pool): Promise<IMultimediaResource | null> {
    try {
      await pool.query(`
        DELETE FROM multimedia_resources
        WHERE id = $1
        `, [
        this.id
      ]);
      return this;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public static async getById(pool: Pool, id: string): Promise<IMultimediaResource | null> {
    try {
      const res = await pool.query(`
        SELECT * FROM multimedia_resources
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

  public static async getByChildId(pool: Pool, childId: string): Promise<IMultimediaResource[] | null> {
    try {
      const res = await pool.query(`
        SELECT * FROM multimedia_resources
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