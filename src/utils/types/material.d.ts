declare type CreateMaterialType = {
  name: string;
  type: string;
  file: string;
  course_id: string;
};

declare type MaterialType = {
  id: string;
  name: string;
  type: string;
  file: string;
  course_id: string;
  course: CourseType;
  created_at: Date;
  updated_at: Date;
};

declare type RemoveMaterialType = {
  id: string;
  course_id: string;
};
