export interface Patient {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  document_photo_path: string;
  created_at?: string;
  updated_at?: string;
}
