import { openDb } from "@/data/connection";


// GET all cats api/cats/
export async function GET(req: Request) {
  const db = await openDb();

  if (db) {
    const cats = await db.all(`SELECT * FROM cats`);
    db.close();
    return new Response(JSON.stringify(cats), {
      status: 200,
      headers: { "Content-type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({ message: "Cannot connect to database" }),
    {
      status: 500,
      headers: { "Content-type": "application/json" },
    }
  );
}

// POST Add new cat api/cats/
export async function POST(req: Request) {
  const formData = await req.formData();

  const db = await openDb();

  if (db) {
    const insertSql = `INSERT INTO cats(photo_url, name, age, weight) VALUES(?, ?, ?, ?)`;
    const result = await db.run(insertSql, formData.values().toArray());
    if (result.lastID) {
      return new Response(
        JSON.stringify({ message: `Cat ID #${result.lastID} has been saved!` }),
        {
          status: 201,
          headers: { "Content-type": "application/json" },
        }
      );
    } else {
      return new Response(JSON.stringify({ message: "Cannot persist data" }), {
        status: 500,
        headers: { "Content-type": "application/json" },
      });
    }
  } else {
    return new Response(
      JSON.stringify({ message: "Cannot connect to database" }),
      {
        status: 500,
        headers: { "Content-type": "application/json" },
      }
    );
  }
}
