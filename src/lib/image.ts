import axios from "@/lib/axios";

export async function isImageUrl(url: string): Promise<boolean> {
  try {
    const response = await axios.get(url);
    const contentType = response.headers["content-type"];
    return contentType.startsWith("image/");
  } catch {
    return false;
  }
}
