import { Request, response, Response } from "express";
import { SponsorService } from "./sponsors.service";
import type { Sponsor } from "./sponsors.model";

const sponsorService = new SponsorService();

export const getSponsorByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  const sponsorId = req.params.id;
  try {
    console.log("test" + sponsorId);
    const sponsor = await sponsorService.getById(sponsorId);
    res.status(200).json(sponsor);
  } catch (error) {
    res.status(500).json({ message: "erreur " });
  }
};

export const getSponsorByTagController = async (
  req: Request<{ tag: string }>,
  res: Response,
): Promise<void> => {
  const sponsorTag = req.params.tag;
  try {
    const sponsor = await sponsorService.getByTag(sponsorTag);
    res.status(200).json(sponsor);
  } catch (error) {
    res.status(500).json({ message: "erreur sur getTag" });
  }
};

export const getAllSponsorController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const sponsors = await sponsorService.getAll();
    res.status(200).json(sponsors);
  } catch (error) {
    res.status(500).json({ message: "erreur sur get all" });
  }
};
