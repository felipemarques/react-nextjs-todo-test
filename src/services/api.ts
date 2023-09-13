class Api {
  private baseUrl: string;

  constructor({ baseUrl }: { baseUrl: string }) {
    this.baseUrl = baseUrl;
  }

  public async get<TData>(url: string) {
    const response = await fetch(`${this.baseUrl}${url}`);

    return response.json() as TData | null;
  }

  public async post<TData>(url: string, body: any) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      headers: {
        ...this._contentTypeJson(),
      },
      body: JSON.stringify(body),
    });

    return response.json() as TData | null;
  }

  public async put<TData>(url: string, body: any) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "PUT",
      headers: {
        ...this._contentTypeJson(),
      },
      body: JSON.stringify(body),
    });

    return response.json() as TData | null;
  }

  public async delete<TData>(url: string) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "DELETE",
    });

    return response.json() as TData | null;
  }

  public async patch<TData>(url: string, body: any) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "PATCH",
      headers: {
        ...this._contentTypeJson(),
      },
      body: JSON.stringify(body),
    });

    return response.json() as TData | null;
  }

  private _contentTypeJson() {
    return {
      "Content-Type": "application/json",
    };
  }
}

export const api = new Api({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api",
});
