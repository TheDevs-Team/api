declare type CreateCourseType = {
  name: string;
  manager_id: string;
};

declare type CourseType = {
  id: string;
  name: string;
  manager_id: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
};

declare type UpdateCourseType = {
  id: string;
  name: string;
};
