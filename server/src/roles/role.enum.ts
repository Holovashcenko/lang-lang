export enum Role {
  Student = 'student', // Can only view course content
  Teacher = 'teacher', // Can create, update, and delete course content
  Admin = 'admin', // Can manage users and courses
  SuperAdmin = 'superadmin', // Has all permissions, including system-wide settings, create and delete admins
}
