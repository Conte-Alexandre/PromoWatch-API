import prisma from "../../config/prisma";
import type { Sponsor } from "./sponsors.model";

export class SponsorRepository {
  async findSponsorsByTag(tag: string): Promise<Sponsor[]> {
    try {
      const sponsors = await prisma.sponsor.findMany({
        where: { industry: tag },
      });
      return sponsors;
    } catch (error) {
      throw error;
    }
  }
  async findAllSponsors(): Promise<Sponsor[]> {
    try {
      const sponsors = await prisma.sponsor.findMany();
      return sponsors;
    } catch (error) {
      throw error;
    }
  }
  async findSponsorById(id: string): Promise<Sponsor | null> {
    try {
      const sponsor = await prisma.sponsor.findUnique({
        where: { id: id },
      });
      return sponsor;
    } catch (error) {
      throw error;
    }
  }
}
