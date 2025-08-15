export default interface Quest { 
    id: string;
    title: string;
    content?: string;      // adjust to your schema (maybe `description`)
    created_at?: string;
};