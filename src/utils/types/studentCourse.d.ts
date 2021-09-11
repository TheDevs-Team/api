declare type CreateStudentCourseType = {
  user_id: string;
  course_id: string;
};

declare type StudentCourseType = {
  id: string;
  user_id: string;
  user: UserType;
  course_id: string;
  course: CourseType;
  status: string;
  created_at: Date;
  updated_at: Date;
};
