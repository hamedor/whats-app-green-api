interface RequestOptions {
  method: string;
  body?: string;
  headers?: {
    "Content-Type": string;
  };
}

async function request(
  url: string,
  method: string,
  deleteUrl = "",
  body?: Record<string, unknown>
) {
  let data;

  try {
    const options: RequestOptions = {
      method,
    };
    if (body) {
      options.body = JSON.stringify(body);
      options.headers = {
        "Content-Type": "application/json",
      };
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    if (method !== "DELETE") {
      data = await response.json();
    }
  } catch (error: any) {
    console.error("Error:", error);
    return error.message;
  }

  if (deleteUrl && data !== null) {
    deleteUrl += data.receiptId;
    await request(deleteUrl, "DELETE");
  }

  return data;
}

export default request;
