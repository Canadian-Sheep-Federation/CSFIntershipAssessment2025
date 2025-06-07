import { openDb } from "@/data/db";

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

  return new Response(JSON.stringify("Cannot connect to database"), {
    status: 500,
    headers: { "Content-type": "application/json" },
  });
}

export function POST(req: Request){

}
