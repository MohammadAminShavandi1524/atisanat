import type {
  CVResumeFormValues,
} from "./cv-resume.types";

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

  married: null,
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

  criminalConviction: null,

  physicalHealth: "",

  grantee: null,

  jobInterest: "",

  introducer: "",

  startWork: "",

  askLastBoss: null,

  lastBossName: "",
  lastBossAddress: "",
  lastBossPhoneNumber: "",

  salaryRequest: "",

  anotherJob: null,

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
  read:
    "basic" as const,
  write:
    "basic" as const,
  speak:
    "basic" as const,
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

// import type { CVResumeFormValues } from "./cv-resume.types";

// export const cvResumeDefaultValues: CVResumeFormValues = {
//   image: "https://example.com/test-user.jpg",

//   firstName: "علی",
//   lastName: "احمدی",
//   fatherName: "رضا",

//   nationalCode: "0084575948",
//   placeOfIssue: "تهران",
//   dateOfBirth: "1995-05-12",

//   religion: "islam",
//   mazhab: "shia",

//   married: true,
//   children: "1",

//   dependents: [
//     {
//       name: "سارا احمدی",
//       relation: "child",
//     },
//   ],

//   province: "Tehran",
//   city: "Tehran",
//   address: "تهران، خیابان ولیعصر، کوچه دهم، پلاک ۱۲",

//   email: "test@example.com",
//   phoneNumber: "09123456789",

//   education: [
//     {
//       place: "دانشگاه تهران",
//       start: "2014-09-23",
//       end: "2018-06-20",
//       major: "مهندسی مکانیک",
//       licence: "کارشناسی",
//     },
//   ],

//   research: "ماشین‌کاری CNC و ساخت قطعات دقیق",

//   languages: [
//     {
//       language: "انگلیسی",
//       read: "advanced",
//       write: "intermediate",
//       speak: "intermediate",
//     },
//   ],

//   workExperience: [
//     {
//       place: "شرکت آتی هوش بنیان",
//       job: "مهندس مکانیک",
//       start: "2020-01-01",
//       end: "2024-01-01",
//       salary: "250000000",
//       leaveReasone: "پایان قرارداد",
//     },
//   ],

//   dutyStatus: "served",
//   offDutyReason: "",

//   criminalConviction: false,

//   physicalHealth: "از نظر جسمانی در وضعیت مناسبی هستم.",

//   grantee: true,

//   jobInterest: "ماشین‌کاری CNC و مهندسی تولید",

//   introducer: "وب‌سایت شرکت",

//   startWork: "2026-10-20",

//   askLastBoss: true,

//   lastBossName: "رضا محمدی",
//   lastBossAddress: "تهران، خیابان انقلاب",
//   lastBossPhoneNumber: "09121234567",

//   salaryRequest: "350000000",

//   anotherJob: false,

//   extra: "اطلاعات تست برای بررسی فرم",

//   closePeopleContact: [
//     {
//       name: "حسین احمدی",
//       address: "تهران، خیابان آزادی",
//       number: "09121111111",
//     },
//     {
//       name: "مهدی کریمی",
//       address: "کرج، عظیمیه",
//       number: "09122222222",
//     },
//   ],
// };

// export const emptyDependent = {
//   name: "",
//   relation: "",
// };

// export const emptyEducation = {
//   place: "",
//   start: "",
//   end: "",
//   major: "",
//   licence: "",
// };

// export const emptyLanguage = {
//   language: "",
//   read: "basic" as const,
//   write: "basic" as const,
//   speak: "basic" as const,
// };

// export const emptyWorkExperience = {
//   place: "",
//   job: "",
//   start: "",
//   end: "",
//   salary: "",
//   leaveReasone: "",
// };

// export const emptyClosePerson = {
//   name: "",
//   address: "",
//   number: "",
// };
