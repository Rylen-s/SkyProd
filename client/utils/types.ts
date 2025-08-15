export interface Activity {
    id: number;
    uid: string;          // Firebase UID of the user
    description: string;  // what the user logged
    created_at: string;   // ISO timestamp from Postgres
  }

export type RootStackParamList = {
    Title: undefined;
    Signin: undefined;
    Tabs: undefined;
    NotFound: undefined;
  };

export interface Quest { 
    id: string;
    title: string;
    content?: string;      // adjust to your schema (maybe `description`)
    created_at?: string;
};