export interface MouPartner {
  id: number;
  name: string;
  category: string;
}

export interface MouParticipant {
  id: number;
  mou_id: number;
  side: string;
  partner_id: number | null;
  address: string;
  signatory_name: string | null;
  signatory_position: string | null;
  responsible_person_name: string | null;
  responsible_person_position: string | null;
  created_at: string;
  updated_at: string;
}

export interface MouIndicator {
  id: number;
  name: string;
  mou_id: number;
  created_at: string;
  updated_at: string;
}

export interface MouDetail {
  id: number;
  letter_number: string;
  title: string;
  start_date_formatted: string;
  end_date_formatted: string;
  start_date: string;
  end_date: string;
  description: string;
  file_url: string | null;
  status: string;
  partner: MouPartner;
  participants: MouParticipant[];
  indicators: MouIndicator[];
  creator: string;
  created_at: string;
  updated_at: string;
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
}

export interface RelatedMoa {
  id: number;
  letter_number: string;
  title: string;
  start_date: string;
  end_date: string;
  status: string;
  mou_id: number;
  description: string;
  path: string;
  budget_allocation: string | null;
  income_generate: string | null;
  is_upload_kerma: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  participants: MoaParticipant[];
}

export interface PaginatedRelatedMoas {
  current_page: number;
  data: RelatedMoa[];
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

export interface MouDetailResponse {
  success: boolean;
  data: MouDetail;
  related_moas: PaginatedRelatedMoas;
}
