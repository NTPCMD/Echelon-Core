import OpenAI from "openai";
import type { AiSearchResult, SearchIntent } from "@echelon/types";

export interface AiGatewayProvider {
  detect(input: { message: string; location?: string }): Promise<Omit<AiSearchResult, "businessIds">>;
}

const categories = ["Hair Salon", "Massage", "DJ", "Photography", "Beauty", "Wellness", "Fitness"];

export class HeuristicProvider implements AiGatewayProvider {
  async detect({ message, location }: { message: string; location?: string }) {
    const lower = message.toLowerCase();
    const category = categories.find((item) => lower.includes(item.toLowerCase().split(" ")[0] ?? item.toLowerCase()));
    const intent: SearchIntent = lower.includes("book") || lower.includes("tomorrow") ? "book_service" : category ? "discover_business" : "unknown";
    const detectedLocation = location ?? (lower.includes("perth") ? "Perth" : undefined);
    return {
      intent,
      ...(category ? { category, service: category } : {}),
      ...(detectedLocation ? { location: detectedLocation } : {}),
      confidence: category ? 0.72 : 0.42,
      message: `I found ${category ?? "service"} options that match your request.`,
    };
  }
}

export class OpenAiProvider implements AiGatewayProvider {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async detect(input: { message: string; location?: string }) {
    const response = await this.client.responses.create({ model: "gpt-4.1-mini", input: `Return only JSON with intent, category, service, location, date, time, confidence, message for this local commerce request: ${JSON.stringify(input)}` });
    return JSON.parse(response.output_text) as Omit<AiSearchResult, "businessIds">;
  }
}

export class AiGateway {
  constructor(private readonly provider: AiGatewayProvider) {}

  async search(input: { message: string; location?: string }, businessIds: string[] = []): Promise<AiSearchResult> {
    const detected = await this.provider.detect(input);
    return { ...detected, businessIds };
  }
}

export const createAiGateway = (apiKey?: string) => new AiGateway(apiKey ? new OpenAiProvider(apiKey) : new HeuristicProvider());
