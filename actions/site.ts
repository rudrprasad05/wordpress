"use server";

import prisma from "@/lib/prismadb";
import { getCurrentUser } from "./user";
import { CreateSiteSchema, CreateSiteSchemaType } from "@/schema/site";

class UserNotFoundErr extends Error {}

export async function GetSiteStats() {
  const user = await getCurrentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const stats = await prisma.site.aggregate({
    where: {
      authorId: user.id,
    },
    _sum: {
      visits: true,
    },
  });
  const visits = stats._sum.visits || 0;

  return {
    visits,
  };
}

export async function CreateSite(data: CreateSiteSchemaType) {
  const validation = CreateSiteSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("Site not valid");
  }

  const user = await getCurrentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const { name, description } = data;

  const Site = await prisma.site.create({
    data: {
      authorId: user.id,
      name,
      description,
    },
  });

  if (!Site) {
    throw new Error("something went wrong");
  }

  return Site.id;
}

export async function GetSites() {
  return await prisma.site.findMany({
    // where: {
    //   authorId: user.id,
    // },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function GetSiteByName(name: string) {
  // const user = await getCurrentUser();
  // if (!user) {
  //   throw new UserNotFoundErr();
  // }

  // await prisma.site.update({
  //   data: {
  //     visits: {
  //       increment: 1,
  //     },
  //   },
  //   where: {
  //     name: name,
  //   },
  // });

  return await prisma.site.findFirst({
    where: {
      name,
    },
    include: {
      author: true,
    },
  });
}

export async function GetSiteById(id: string) {
  // const user = await getCurrentUser();
  // if (!user) {
  //   throw new UserNotFoundErr();
  // }

  await prisma.site.update({
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      id: id,
    },
  });

  return await prisma.site.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });
}

export async function UpdateSiteContent(id: string, jsonContent: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.site.update({
    where: {
      authorId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}

export async function PublishSite(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.site.update({
    data: {
      published: true,
    },
    where: {
      authorId: user.id,
      id,
    },
  });
}

export async function GetSiteContentByUrl(SiteUrl: string) {
  return await prisma.site.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareURL: SiteUrl,
    },
  });
}

export async function DeleteSite(id: string) {
  return await prisma.site.delete({
    where: {
      id: id,
    },
  });
}

export async function SubmitSite(SiteUrl: string, content: string) {
  return await prisma.site.update({
    data: {},
    where: {
      shareURL: SiteUrl,
      published: true,
    },
  });
}

export async function GetSiteWithSubmissions(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.site.findUnique({
    where: {
      authorId: user.id,
      id,
    },
  });
}
