import { INotice } from "@/app/notice/page";
import { client } from "@/lib/server/client";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  const res = NextResponse;
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const keyword = searchParams.get("keyword");

  let query: Prisma.noticeFindManyArgs = {};
  switch (keyword !== null && keyword !== "") {
    case false:
      query = {
        orderBy: {
          updatedAt: "desc",
        },
        take: 10,
        skip: (+page! - 1) * 10,
      };
      break;
    case true:
      query = {
        where: {
          OR: [
            {
              title: {
                contains: keyword!,
              },
            },
            {
              content: {
                contains: keyword!,
              },
            },
          ],
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 10,
        skip: (+page! - 1) * 10,
      };
  }
  try {
    const notices = await client.notice.findMany(query);

    const totalNotice = await client.notice.count();
    const totalPage = Math.ceil(totalNotice / 10);

    return res.json({
      ok: true,
      notices,
      totalPage,
    });
  } catch (error) {
    console.log(error);
    return res.json({ ok: false });
  }
}

export async function POST(req: Request) {
  const res = NextResponse;
  const { title, content } = await req.json();
  try {
    const notice: INotice[] =
      await client.$queryRaw`insert into notice ("createdAt", "updatedAt", "title", "content") values (current_timestamp, current_timestamp, ${title}, ${content}) RETURNING *`;


    return res.json({
      ok: true,
      id: notice[0].id,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      ok: false,
    });
  }
}
