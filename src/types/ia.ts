export interface IaActivityPivot {
  ia_id: number;
  activity_id: number;
  id: number;
  contract_value: string | null;
  volume: string | null;
  unit: string | null;
  activity_description: string | null;
  activity_target: string | null;
  performance_indicator: string | null;
  created_at: string;
  updated_at: string;
}

export interface IaActivity {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  pivot: IaActivityPivot;
}

export interface IaStudyProgram {
  id: number;
  name: string;
  code: string;
  institution_id: number;
  phone: string | null;
  email: string | null;
  website: string | null;
  description: string | null;
  status: string;
  type: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  pivot: {
    ia_participant_id: number;
    studyprogram_id: number;
  };
}

export interface IaPartnerCategory {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface IaPartner {
  id: number;
  name: string;
  partner_category_id: number;
  parent_id: number | null;
  level: string;
  city: string | null;
  province: string | null;
  country: string;
  desc_region: string;
  continent: string;
  description: string | null;
  logo: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  category: IaPartnerCategory;
}

export interface IaParticipant {
  id: number;
  ia_id: number;
  side: string;
  partner_id: number | null;
  address: string;
  signatory_name: string | null;
  signatory_position: string | null;
  responsible_person_name: string | null;
  responsible_person_position: string | null;
  created_at: string;
  updated_at: string;
  studyprograms: IaStudyProgram[];
  partner: IaPartner | null;
}

export interface IaParentMoa {
  id: number;
  title: string;
  letter_number: string;
}

export interface IaImplementer {
  id: number;
  name: string;
  type: string;
  ia_id: number;
  nim: string | null;
  nip: string | null;
  created_at: string;
  updated_at: string;
}

export interface IaDetail {
  id: number;
  letter_number: string;
  title: string;
  start_date_formatted: string;
  end_date_formatted: string;
  start_date: string;
  end_date: string;
  description: string | null;
  budget_allocation: string | null;
  income_generate: string | null;
  is_upload_kerma: number | null;
  file_url: string | null;
  status: string;
  moa: IaParentMoa | null;
  activities: IaActivity[];
  participants: IaParticipant[];
  implementers: IaImplementer[];
}

export interface IaDetailResponse {
  success: boolean;
  data: IaDetail;
}
