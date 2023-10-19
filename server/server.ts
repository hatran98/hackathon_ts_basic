import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./utils/db";
const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
const port = 3000;
const API = "/api/v1/todo";
app.get(`${API}`, async (req: Request, res: Response) => {
  try {
    const [todo] = await db.execute(`SELECT * FROM todo`);
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
  }
});

app.post(`${API}`, async (req: Request, res: Response) => {
  const { todo } = req.body;
  try {
    if (todo) {
      const [newTodo] = await db.execute(`INSERT INTO todo(todo) VALUES (?)`, [
        todo,
      ]);
      res.status(200).json(newTodo);
    } else {
      res.status(500).json({
        message: "Không đc để trống",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.put(`${API}/:id`, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [findTodo]: any = await db.execute(
      `SELECT * FROM todo WHERE id = ?`,
      [id]
    );
    if (findTodo.length > 0) {
      const completed = findTodo[0].completed;
      const newCompleted = completed === 0 ? 1 : 0;
      db.execute(`UPDATE todo SET \`completed\` = ? WHERE id = ?`, [
        newCompleted,
        id,
      ]);
      res.status(200).json({
        message: "Update successfully",
      });
    } else {
      res.status(500).json({
        message: "todo not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
app.delete(`${API}/:id`, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [findTodo]: any = await db.execute(`SELECT * FROM todo WHERE id =?`, [
      id,
    ]);
    if (findTodo.length > 0) {
      db.execute(`DELETE FROM todo WHERE id =?`, [id]);
      res.status(200).json({ message: "Delete successfully" });
    } else {
      res.status(500).json({
        message: "todo not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
