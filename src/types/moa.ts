export interface MoaActivityPivot {
  moa_id: number;
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

export interface MoaActivity {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  pivot: MoaActivityPivot;
}

export interface MoaInstitution {
  id: number;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  type: string;
  status: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  pivot: {
    moa_participant_id: number;
    institution_id: number;
  };
}

export interface MoaPartnerCategory {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface MoaPartner {
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
  description: string;
  logo: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  category: MoaPartnerCategory;
}

export interface MoaParticipant {
  id: number;
  moa_id: number;
  side: string;
  partner_id: number | null;
  address: string;
  signatory_name: string | null;
  signatory_position: string | null;
  responsible_person_name: string | null;
  responsible_person_position: string | null;
  created_at: string;
  updated_at: string;
  institutions: MoaInstitution[];
  partner: MoaPartner | null;
}

export interface MoaParentMou {
  id: number;
  letter_number: string;
  title: string;
  start_date: string;
  end_date: string;
  status: string;
}

export interface MoaDetail {
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
  mou: MoaParentMou | null;
  activities: MoaActivity[];
  participants: MoaParticipant[];
}

export interface RelatedIa {
  id: number;
  letter_number: string;
  title: string;
  start_date: string;
  end_date: string;
  status: string;
  moa_id: number;
  description: string | null;
  path: string;
  budget_allocation: string | null;
  income_generate: string | null;
  is_upload_kerma: number | null;
  created_by: number | null;
  created_at: string;
  updated_at: string;
}

export interface PaginatedRelatedIas {
  current_page: number;
  data: RelatedIa[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{ url: string | null; label: string; active: boolean }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface MoaDetailResponse {
  success: boolean;
  data: MoaDetail;
  related_ias: PaginatedRelatedIas;
}
