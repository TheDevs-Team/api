declare type CreateCourseType = {
  name: string;
  description: string;
  manager_id: string;
};

declare type CourseType = {
  id: string;
  name: string;
  description: string;
  manager_id: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
};

declare type UpdateCourseType = {
  id: string;
  name: string;
};
