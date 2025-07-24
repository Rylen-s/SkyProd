export interface Activity {
    id: number;
    uid: string;          // Firebase UID of the user
    description: string;  // what the user logged
    created_at: string;   // ISO timestamp from Postgres
  }