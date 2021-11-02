// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { NotionAPI } from "../../lib/notion";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const api = new NotionAPI();

  const data = await api.getTaskList();
  res.status(200).json(data);
}
