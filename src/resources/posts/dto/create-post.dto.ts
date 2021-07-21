export class CreatePostDto {
  readonly user_id: number;
  readonly title: string;
  readonly body: string;
  readonly category_id: number;
}
