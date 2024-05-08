type Describe =
  | {
      type: 'social_media';
      social_media_avatar: string;
      nipp: string;
    }
  | {
      type: 'employee';
      is_sme: boolean;
      nipp: string;
      position: string;
      avatar: string;
    }
  | {
      type: 'post';
      creator: string;
      category_post: string;
    }
  | {
      type: 'survey';
      creator: string;
      category_post: string;
    }
  | {
      type: 'document';
      link_file: string;
      type_file: string;
    }
  | {
      type: 'course';
      type_course: string;
    }
  | {
      type: 'trainer';
      is_sme: boolean;
      avatar: string;
      type_trainer: string;
    };

type BaseResponseData = {
  type: string;
  id: number;
  display: string;
  describe: Describe;
};

export type Socmed = BaseResponseData & {
  type: 'socmed';
  describe: Extract<Describe, { type: 'social_media' }>;
};
export type Employee = BaseResponseData & {
  type: 'employee';
  describe: Extract<Describe, { type: 'employee' }>;
};
export type Post = BaseResponseData & {
  type: 'post';
  describe: Extract<Describe, { type: 'post' }>;
};
export type Survey = BaseResponseData & {
  type: 'survey';
  describe: Extract<Describe, { type: 'survey' }>;
};
export type Document = BaseResponseData & {
  type: 'document';
  describe: Extract<Describe, { type: 'document' }>;
};
export type Course = BaseResponseData & {
  type: 'course';
  describe: Extract<Describe, { type: 'course' }>;
};
export type Trainer = BaseResponseData & {
  type: 'trainer';
  describe: Extract<Describe, { type: 'trainer' }>;
};
// export type Survey = BaseResponseData & { type: 'survey' };

export type ResponseData =
  | Socmed
  | Employee
  | Post
  | Document
  | Course
  | Trainer;
// | Survey;

export type TransformedItem = {
  label: string;
  value: string;
  data: ResponseData;
};

export type GroupedData = {
  group: string;
  items: TransformedItem[];
};
