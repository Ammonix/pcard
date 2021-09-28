export interface Rubric {
  id: string;
  name: string;
  subTitle?: string;
  imageSource: string;
  children?: Rubric[];
  x?: number;
  y?: number;
}
