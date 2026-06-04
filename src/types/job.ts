export type JobItem = {
  job_id: string;
  employer_name: string;
  employer_logo: string | null;
  employer_website: string | null;
  job_title: string;
  job_apply_link: string;
  job_description: string;
  job_is_remote: boolean;
  job_employment_type: string | null;
  job_posted_at_datetime_utc: string | null;
  job_city: string | null;
  job_country: string;
  job_min_salary: number | null;
  job_max_salary: number | null;
  job_salary_currency: string | null;
  job_salary_period: string | null;
  job_required_skills: string[] | null;
};

export type JobSearchResponse = {
  status: string;
  data: {
    jobs: JobItem[];
    cursor: string | null;
  };
};
