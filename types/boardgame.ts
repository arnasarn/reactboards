export type Game = {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  releaseYear: number;
  playTimeMin: number;
  bestStartPlayAtAge: number;
  rating: number;
  dificulty: number; // (you might want to fix spelling to 'difficulty' if it's a typo!)
  boxSize: string;
  ratingCount: number;
  canPlayPersons: number[];
  bestPlayPersons: number[];
  cratedAt: Date; // (also might be a typo—did you mean 'createdAt'?)
};

export type GameInsert = Omit<Game, "id" | "cratedAt">;
