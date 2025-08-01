export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      live_classes: {
        Row: {
          class_date: string
          class_time: string
          created_at: string
          id: string
          instructor: string
          subject: string
        }
        Insert: {
          class_date: string
          class_time: string
          created_at?: string
          id?: string
          instructor: string
          subject: string
        }
        Update: {
          class_date?: string
          class_time?: string
          created_at?: string
          id?: string
          instructor?: string
          subject?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          class: string
          created_at: string
          file_url: string | null
          id: string
          is_sample: boolean | null
          pages: number | null
          preview: string | null
          price: number | null
          rating: number | null
          subject: string
          title: string
          topics: string[] | null
          updated_at: string
        }
        Insert: {
          class: string
          created_at?: string
          file_url?: string | null
          id?: string
          is_sample?: boolean | null
          pages?: number | null
          preview?: string | null
          price?: number | null
          rating?: number | null
          subject: string
          title: string
          topics?: string[] | null
          updated_at?: string
        }
        Update: {
          class?: string
          created_at?: string
          file_url?: string | null
          id?: string
          is_sample?: boolean | null
          pages?: number | null
          preview?: string | null
          price?: number | null
          rating?: number | null
          subject?: string
          title?: string
          topics?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      professors: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string
          experience: string | null
          id: string
          name: string
          phone: string | null
          qualification: string | null
          rating: number | null
          status: string | null
          student_count: number | null
          subjects: string[]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email: string
          experience?: string | null
          id?: string
          name: string
          phone?: string | null
          qualification?: string | null
          rating?: number | null
          status?: string | null
          student_count?: number | null
          subjects?: string[]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          experience?: string | null
          id?: string
          name?: string
          phone?: string | null
          qualification?: string | null
          rating?: number | null
          status?: string | null
          student_count?: number | null
          subjects?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          class: string | null
          created_at: string
          display_name: string | null
          id: string
          join_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          class?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          join_date?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          class?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          join_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      purchases: {
        Row: {
          id: string
          item_title: string
          item_type: string
          price: number | null
          purchased_at: string
          subject: string | null
          user_id: string
        }
        Insert: {
          id?: string
          item_title: string
          item_type: string
          price?: number | null
          purchased_at?: string
          subject?: string | null
          user_id: string
        }
        Update: {
          id?: string
          item_title?: string
          item_type?: string
          price?: number | null
          purchased_at?: string
          subject?: string | null
          user_id?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          class: string
          created_at: string
          email: string | null
          enrollment_date: string | null
          enrollment_status: string | null
          id: string
          last_active: string | null
          name: string
          phone: string | null
          subjects: string[] | null
          updated_at: string
          user_id: string | null
          whatsapp: string | null
        }
        Insert: {
          class: string
          created_at?: string
          email?: string | null
          enrollment_date?: string | null
          enrollment_status?: string | null
          id?: string
          last_active?: string | null
          name: string
          phone?: string | null
          subjects?: string[] | null
          updated_at?: string
          user_id?: string | null
          whatsapp?: string | null
        }
        Update: {
          class?: string
          created_at?: string
          email?: string | null
          enrollment_date?: string | null
          enrollment_status?: string | null
          id?: string
          last_active?: string | null
          name?: string
          phone?: string | null
          subjects?: string[] | null
          updated_at?: string
          user_id?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      subjects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      tuition_plans: {
        Row: {
          created_at: string
          display_order: number | null
          features: string[] | null
          id: string
          is_active: boolean | null
          name: string
          price: number
          subject_count: number | null
          subjects_included: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          name: string
          price: number
          subject_count?: number | null
          subjects_included?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
          subject_count?: number | null
          subjects_included?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          id: string
          notes_count: number | null
          progress_percentage: number | null
          subject_id: string
          updated_at: string
          user_id: string
          videos_count: number | null
        }
        Insert: {
          id?: string
          notes_count?: number | null
          progress_percentage?: number | null
          subject_id: string
          updated_at?: string
          user_id: string
          videos_count?: number | null
        }
        Update: {
          id?: string
          notes_count?: number | null
          progress_percentage?: number | null
          subject_id?: string
          updated_at?: string
          user_id?: string
          videos_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
