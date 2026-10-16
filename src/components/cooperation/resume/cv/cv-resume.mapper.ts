import type {
  CreateCVResumeRequest,
  CVResumeFormValues,
} from "./cv-resume.types";

const nullableText = (
  value: string,
): string | null => {
  const trimmed =
    value.trim();

  return trimmed
    ? trimmed
    : null;
};

export const mapCVResumeToRequest = (
  values: CVResumeFormValues,
): CreateCVResumeRequest => {
  return {
    image:
      values.image,

    first_name:
      values.firstName.trim(),

    last_name:
      values.lastName.trim(),

    father_name:
      values.fatherName.trim(),

    national_code:
      values.nationalCode.trim(),

    place_of_issue:
      values.placeOfIssue.trim(),

    date_of_birth:
      values.dateOfBirth,

    religion:
      values.religion,

    mazhab:
      values.mazhab,

    married:
      values.married ===
      true,

    children:
      values.married ===
      true
        ? nullableText(
            values.children,
          )
        : null,

    dependents:
      values.dependents.length >
      0
        ? values.dependents.map(
            (
              item,
            ) => ({
              name:
                item.name.trim(),

              relation:
                item.relation,
            }),
          )
        : null,

    province:
      values.province,

    city:
      values.city,

    address:
      values.address.trim(),

    email:
      values.email.trim(),

    phone_number:
      values.phoneNumber.trim(),

    education:
      values.education.map(
        (
          item,
        ) => ({
          place:
            item.place.trim(),

          start:
            item.start,

          end:
            item.end,

          major:
            item.major.trim(),

          licence:
            item.licence.trim(),
        }),
      ),

    research:
      nullableText(
        values.research,
      ),

    languages:
      values.languages.map(
        (
          item,
        ) => ({
          language:
            item.language.trim(),

          read:
            item.read,

          write:
            item.write,

          speak:
            item.speak,
        }),
      ),

    work_experience:
      values.workExperience
        .length > 0
        ? values.workExperience.map(
            (
              item,
            ) => ({
              place:
                item.place.trim(),

              job:
                item.job.trim(),

              start:
                item.start,

              end:
                item.end,

              salary:
                item.salary.trim(),

              leave_reasone:
                item.leaveReasone.trim(),
            }),
          )
        : null,

    duty_status:
      values.dutyStatus,

    off_duty_reason:
      values.dutyStatus ===
      "exempt"
        ? nullableText(
            values.offDutyReason,
          )
        : null,

    criminal_conviction:
      values.criminalConviction ===
      true,

    physical_health:
      values.physicalHealth.trim(),

    grantee:
      values.grantee ===
      true,

    job_interest:
      values.jobInterest.trim(),

    introducer:
      nullableText(
        values.introducer,
      ),

    start_work:
      values.startWork,

    ask_last_boss:
      values.askLastBoss ===
      true,

    last_boss_name:
      values.askLastBoss ===
      true
        ? nullableText(
            values.lastBossName,
          )
        : null,

    last_boss_address:
      values.askLastBoss ===
      true
        ? nullableText(
            values.lastBossAddress,
          )
        : null,

    last_boss_phone_number:
      values.askLastBoss ===
      true
        ? nullableText(
            values.lastBossPhoneNumber,
          )
        : null,

    salary_request:
      values.salaryRequest.trim(),

    another_job:
      values.anotherJob ===
      true,

    extra:
      nullableText(
        values.extra,
      ),

    close_people_contact:
      values.closePeopleContact
        .length > 0
        ? values.closePeopleContact.map(
            (
              item,
            ) => ({
              name:
                item.name.trim(),

              address:
                item.address.trim(),

              number:
                item.number.trim(),
            }),
          )
        : null,
  };
};