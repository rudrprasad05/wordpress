import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { CreateSiteSchemaType } from "@/schema/site";

export async function POST(request: Request) {
  try {
    const body: CreateSiteSchemaType = await request.json();
    const { name, description, authorId } = body;

    const category = await prisma.site.create({
      data: {
        name,
        description: description || "",
        authorId: authorId || "",
        published: false,
        content: "['hello']",
        visits: 0,
        likes: 0,
        shareURL: name as string,
      },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    console.log(error, "NEW BRANCH ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const site = await prisma.site.findMany();

    return NextResponse.json(site);
  } catch (error: any) {
    console.log(error, "NEW BRANCH ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}
