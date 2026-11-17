export type Vehicle = {
  photo_url: string;
  name: string;
  model: string;
  transmission: "auto" | "manual";
  seats: number;
  pricePerDay: number;
  status: "available" | "unavailable";
};