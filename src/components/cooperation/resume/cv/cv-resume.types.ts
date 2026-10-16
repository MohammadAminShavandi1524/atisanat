export type LanguageLevel = "basic" | "intermediate" | "advanced";

export type DutyStatus = "served" | "not_served" | "exempt";

export interface DependentFormItem {
  name: string;
  relation: string;
}

export interface EducationFormItem {
  place: string;
  start: string;
  end: string;
  major: string;
  licence: string;
}

export interface LanguageFormItem {
  language: string;
  read: LanguageLevel;
  write: LanguageLevel;
  speak: LanguageLevel;
}

export interface WorkExperienceFormItem {
  place: string;
  job: string;
  start: string;
  end: string;
  salary: string;
  leaveReasone: string;
}

export interface ClosePersonFormItem {
  name: string;
  address: string;
  number: string;
}

export interface CVResumeFormValues {
  image: string;

  firstName: string;
  lastName: string;
  fatherName: string;

  nationalCode: string;
  placeOfIssue: string;
  dateOfBirth: string;

  religion: string;
  mazhab: string;

  married: boolean;
  children: string;

  dependents: DependentFormItem[];

  province: string;
  city: string;
  address: string;

  email: string;
  phoneNumber: string;

  education: EducationFormItem[];

  research: string;

  languages: LanguageFormItem[];

  workExperience: WorkExperienceFormItem[];

  dutyStatus: DutyStatus | "";
  offDutyReason: string;

  criminalConviction: boolean;

  physicalHealth: string;

  grantee: boolean;

  jobInterest: string;

  introducer: string;

  startWork: string;

  askLastBoss: boolean;

  lastBossName: string;
  lastBossAddress: string;
  lastBossPhoneNumber: string;

  salaryRequest: string;

  anotherJob: boolean;

  extra: string;

  closePeopleContact: ClosePersonFormItem[];
}

export interface DependentRequestItem {
  name: string;
  relation: string;
}

export interface EducationRequestItem {
  place: string;
  start: string;
  end: string;
  major: string;
  licence: string;
}

export interface LanguageRequestItem {
  language: string;
  read: string;
  write: string;
  speak: string;
}

export interface WorkExperienceRequestItem {
  place: string;
  job: string;
  start: string;
  end: string;
  salary: string;
  leave_reasone: string;
}

export interface ClosePersonRequestItem {
  name: string;
  address: string;
  number: string;
}

export interface CreateCVResumeRequest {
  image: string;

  first_name: string;
  last_name: string;
  father_name: string;

  national_code: string;
  place_of_issue: string;
  date_of_birth: string;

  religion: string;
  mazhab: string;

  married: boolean;
  children: string | null;

  dependents: DependentRequestItem[] | null;

  province: string;
  city: string;
  address: string;

  email: string;
  phone_number: string;

  education: EducationRequestItem[];

  research: string | null;

  languages: LanguageRequestItem[];

  work_experience: WorkExperienceRequestItem[] | null;

  duty_status: string;
  off_duty_reason: string | null;

  criminal_conviction: boolean;

  physical_health: string;

  grantee: boolean;

  job_interest: string;

  introducer: string | null;

  start_work: string;

  ask_last_boss: boolean;

  last_boss_name: string | null;
  last_boss_address: string | null;
  last_boss_phone_number: string | null;

  salary_request: string;

  another_job: boolean;

  extra: string | null;

  close_people_contact: ClosePersonRequestItem[] | null;
}