import { client } from "@/lib/server/client";
import { NextResponse } from "next/server";
//@ts-ignore
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const notice = await client.notice.findUnique({
      where: {
        id: +id,
      },
    });

    return NextResponse.json({
      ok: true,
      notice,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      ok: false,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await client.notice.delete({
      where: {
        id: +id,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      ok: false,
    });
  }
}

export async function PATCH(req: Request) {
  const { id, title, content } = await req.json();

  try {
    await client.$executeRaw`update notice set "title" = ${title}, "content" = ${content}, "updatedAt" = current_timestamp where id = ${+id}`;
    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      ok: false,
    });
  }
}
