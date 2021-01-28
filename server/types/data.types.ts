export interface Exercise {
  id: string;
  name: string;
  description: string;
}

export type CreateExercise = Omit<Exercise, "id">;
