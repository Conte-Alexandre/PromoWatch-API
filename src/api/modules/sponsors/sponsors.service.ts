import type { Sponsor } from "./sponsors.model";
import { SponsorRepository } from "./sponsors.repository";
const sponsorRepository = new SponsorRepository();
export class SponsorService {
  async getByTag(tag: string): Promise<Sponsor[]> {
    return sponsorRepository.findSponsorsByTag(tag);
  }
  async getById(id: string): Promise<Sponsor | null> {
    const existingSponsor = await sponsorRepository.findSponsorById(id);
    if (!existingSponsor) {
      throw new Error("Aucun sponsor trouvée");
    }
    return existingSponsor;
  }
  async getAll(): Promise<Sponsor[]> {
    return sponsorRepository.findAllSponsors();
  }
}
