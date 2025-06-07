import { openDb } from "@/data/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: number }> },
) {
  const db = await openDb();

  if (db) {
    const { id } = await params;
    const cat = await db.get(`SELECT * FROM cats WHERE id=${id}`);
    db.close();

    if(!cat){
        return new Response(JSON.stringify({message: "Cat not found"}), {
            status: 404,
            headers: { "Content-type": "application/json" },
        });
    }
    return new Response(JSON.stringify(cat), {
      status: 200,
      headers: { "Content-type": "application/json" },
    });
  }

  return new Response(JSON.stringify({message:"Cannot connect to database"}), {
    status: 500,
    headers: { "Content-type": "application/json" },
  });
}
