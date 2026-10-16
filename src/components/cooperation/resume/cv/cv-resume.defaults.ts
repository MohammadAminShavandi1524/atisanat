import type { CVResumeFormValues } from "./cv-resume.types";

export const cvResumeDefaultValues: CVResumeFormValues = {
  image: "",

  firstName: "",
  lastName: "",
  fatherName: "",

  nationalCode: "",
  placeOfIssue: "",
  dateOfBirth: "",

  religion: "",
  mazhab: "",

  married: false,
  children: "",

  dependents: [],

  province: "",
  city: "",
  address: "",

  email: "",
  phoneNumber: "",

  education: [],

  research: "",

  languages: [],

  workExperience: [],

  dutyStatus: "",
  offDutyReason: "",

  criminalConviction: false,

  physicalHealth: "",

  grantee: false,

  jobInterest: "",

  introducer: "",

  startWork: "",

  askLastBoss: false,

  lastBossName: "",
  lastBossAddress: "",
  lastBossPhoneNumber: "",

  salaryRequest: "",

  anotherJob: false,

  extra: "",

  closePeopleContact: [],
};

export const emptyDependent = {
  name: "",
  relation: "",
};

export const emptyEducation = {
  place: "",
  start: "",
  end: "",
  major: "",
  licence: "",
};

export const emptyLanguage = {
  language: "",
  read: "basic" as const,
  write: "basic" as const,
  speak: "basic" as const,
};

export const emptyWorkExperience = {
  place: "",
  job: "",
  start: "",
  end: "",
  salary: "",
  leaveReasone: "",
};

export const emptyClosePerson = {
  name: "",
  address: "",
  number: "",
};