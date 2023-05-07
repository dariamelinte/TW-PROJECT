import { randomUUID } from "crypto";
import { Pool } from "pg";

export interface IFriendInteractionEvent {
  id?: string;
  childId: string;
  friendId: string;
  date: Date;
  title: string;
  note?: string;
}

export default class FriendInteractionEventEntity {
  public id?: string;
  public childId: string;
  public friendId: string;
  public date: Date;
  public title: string;
  public note?: string;

  constructor(data: IFriendInteractionEvent) {
    this.id = data.id;
    this.childId = data.childId;
    this.friendId = data.friendId;
    this.date = data.date;
    this.title = data.title;
    this.note = data.note;
  }

  public async save(pool: Pool): Promise<IFriendInteractionEvent | null> {
    try {
      await pool.query(`
        INSERT INTO TABLE friend_interactions
          (id, childId, friendId, date, title, note)
        VALUES
          ($1, $2, $3, $4, $5, $6)
        `, [
        randomUUID(),
        this.childId,
        this.friendId,
        this.date,
        this.title,
        this.note
      ]);
      return this;
    } catch (err) {
      console.error(err);
      return null;     
    } 
  }

  public async update(pool: Pool): Promise<IFriendInteractionEvent | null> {
    try {
      await pool.query(`
        UPDATE friend_interactions
        SET
          childId = $1,
          friendId = $2,
          date = $3,
          title = $4,
          note = $5
        WHERE id = $6
        `, [
        this.childId,
        this.friendId,
        this.date,
        this.title,
        this.note,
        this.id
      ]);
      return this;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public static async delete(pool: Pool, id: string): Promise<boolean> {
    try {
      await pool.query(`
        DELETE FROM friend_interactions
        WHERE id = $1
        `, [id]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public static async findById(pool: Pool, id: string): Promise<IFriendInteractionEvent | null> {
    try {
      const result = await pool.query(`
        SELECT * FROM friend_interactions
        WHERE id = $1
        `, [id]);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public static async findByChildId(pool: Pool, childId: string): Promise<IFriendInteractionEvent[] | null> {
    try {
      const result = await pool.query(`
        SELECT * FROM friend_interactions
        WHERE childId = $1
        `, [childId]);
      return result.rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}