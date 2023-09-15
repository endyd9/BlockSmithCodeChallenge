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
  const { id, title, content, changeDate, updatedAt } = await req.json();

  try {
    if (!changeDate) {
      await client.$executeRaw`update notice set "title" = ${title}, "content" = ${content}, "updatedAt" = current_timestamp where id = ${+id}`;
    } else {
      await client.notice.update({
        where: {
          id: +id,
        },
        data: {
          title,
          content,
          updatedAt,
        },
      });
    }

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
