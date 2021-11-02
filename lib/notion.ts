const { Client } = require("@notionhq/client");
const API_KEY: string = process.env.API_KEY || "";
const DATABASE_ID: string = process.env.DATABASE_ID || "";

const reduceTaskList = (notionTaskList: Array<any>) => {
  return notionTaskList.reverse().map((val, index) => {
    return {
      id: val.id,
      name: val.properties.Task.title[0].text.content,
      requestsBefore: index,
    };
  });
};

export class NotionAPI {
  client: any;

  constructor() {
    this.client = new Client({ auth: API_KEY });
  }

  async getDatabases() {
    const res = await this.client.search();

    return res;
  }

  async getTaskList() {
    const res = await this.client.databases.query({
      database_id: DATABASE_ID,
    });

    return res.results;
  }

  async getTaskStatus(task_id: string) {
    const taskList = await this.getTaskList();
    const filtered = taskList.filter((el) => el.id === task_id);
    return filtered.length > 0 ? filtered[0] : null;
  }
}
