import { Exercise } from "../types/data.types";

const Query = {
  Exercise: (
    root: any,
    { id }: { id: string },
    { userId }: { userId: string }
  ) => {},
  Exercises: (root: any, args: any, { userId }: { userId: string }) => {},
  Workout: (
    root: any,
    { id }: { id: string },
    { userId }: { userId: string }
  ) => {},
  Workouts: (root: any, args: any, { userId }: { userId: string }) => {},
};

const Mutation = {
  createWorkout: (
    root: any,
    {
      input: { name, exercises },
    }: { input: { name: string; exercises: Exercise[] } }
  ) => {},
  createExercise: (
    root: any,
    { name, description }: { name: string; description: string }
  ) => {},
};

export default { Query, Mutation };
