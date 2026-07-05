import { createAiGateway } from "@echelon/ai";
import { env } from "../config/env.js";
import { BusinessRepository } from "../repositories/business.repository.js";
export class SearchService { private readonly gateway = createAiGateway(env.OPENAI_API_KEY); constructor(private readonly businesses = new BusinessRepository()) {} async ai(message: string, location?: string) { const detected = await this.gateway.search({ message, location }); const matches = await this.businesses.list({ category: detected.category, location: detected.location }); return { ...detected, businessIds: matches.map((business) => business.id), businesses: matches }; } }
