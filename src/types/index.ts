export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type ItemProps = {
  id: number;
  title: string;
  completed: boolean;
  handleComplete: (id: number) => void;
  handleDelete: (id: number) => void;
}

export type FetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
}
