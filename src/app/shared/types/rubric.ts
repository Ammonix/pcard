export interface Rubric {
  id: string;
  name: string;
  subTitle?: string;
  imgSrc: string;
  children?: Rubric[];
}
