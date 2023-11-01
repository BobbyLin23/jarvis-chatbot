export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      content: {
        Row: {
          content: string | null
          created_at: string
          id: string
          role: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          role?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          role?: string | null
        }
        Relationships: []
      }
      conversation: {
        Row: {
          contents: string | null
          created_at: string
          id: string
          title: string | null
          user_id: string | null
        }
        Insert: {
          contents?: string | null
          created_at?: string
          id?: string
          title?: string | null
          user_id?: string | null
        }
        Update: {
          contents?: string | null
          created_at?: string
          id?: string
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'conversation_contents_fkey'
            columns: ['contents']
            referencedRelation: 'content'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'conversation_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      hnswhandler: {
        Args: {
          '': unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          '': unknown
        }
        Returns: unknown
      }
      match_documents: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
        }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      vector_avg: {
        Args: {
          '': number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          '': string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          '': string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          '': string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          '': string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          '': unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      speaker: 'user' | 'ai'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Conversation = Database['public']['Tables']['conversation']['Row']
