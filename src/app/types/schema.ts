export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      definitions: {
        Row: {
          antonyms: string[] | null
          definition: string | null
          example: string | null
          id: number
          meaning_id: number | null
          synonyms: string[] | null
        }
        Insert: {
          antonyms?: string[] | null
          definition?: string | null
          example?: string | null
          id?: number
          meaning_id?: number | null
          synonyms?: string[] | null
        }
        Update: {
          antonyms?: string[] | null
          definition?: string | null
          example?: string | null
          id?: number
          meaning_id?: number | null
          synonyms?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: 'definitions_meaning_id_fkey'
            columns: ['meaning_id']
            isOneToOne: false
            referencedRelation: 'meanings'
            referencedColumns: ['id']
          },
        ]
      }
      meanings: {
        Row: {
          id: number
          partOfSpeech: string | null
          word_id: number | null
        }
        Insert: {
          id?: number
          partOfSpeech?: string | null
          word_id?: number | null
        }
        Update: {
          id?: number
          partOfSpeech?: string | null
          word_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'meanings_word_id_fkey'
            columns: ['word_id']
            isOneToOne: false
            referencedRelation: 'word'
            referencedColumns: ['id']
          },
        ]
      }
      phonetics: {
        Row: {
          audio: string | null
          id: number
          text: string | null
          word_id: number | null
        }
        Insert: {
          audio?: string | null
          id?: number
          text?: string | null
          word_id?: number | null
        }
        Update: {
          audio?: string | null
          id?: number
          text?: string | null
          word_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'phonetics_word_id_fkey'
            columns: ['word_id']
            isOneToOne: false
            referencedRelation: 'word'
            referencedColumns: ['id']
          },
        ]
      }
      word: {
        Row: {
          id: number
          origin: string | null
          phonetic: string | null
          word: string
        }
        Insert: {
          id?: number
          origin?: string | null
          phonetic?: string | null
          word: string
        }
        Update: {
          id?: number
          origin?: string | null
          phonetic?: string | null
          word?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: 's3_multipart_uploads_bucket_id_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: 's3_multipart_uploads_parts_bucket_id_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 's3_multipart_uploads_parts_upload_id_fkey'
            columns: ['upload_id']
            isOneToOne: false
            referencedRelation: 's3_multipart_uploads'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database }, // eslint-disable-line
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never

// Schema: graphql_public
// Functions
export type ArgsGraphql = Database['graphql_public']['Functions']['graphql']['Args']
export type ReturnTypeGraphql = Database['graphql_public']['Functions']['graphql']['Returns']

// Schema: public
// Tables
export type Definitions = Database['public']['Tables']['definitions']['Row']
export type InsertDefinitions = Database['public']['Tables']['definitions']['Insert']
export type UpdateDefinitions = Database['public']['Tables']['definitions']['Update']

export type Meanings = Database['public']['Tables']['meanings']['Row']
export type InsertMeanings = Database['public']['Tables']['meanings']['Insert']
export type UpdateMeanings = Database['public']['Tables']['meanings']['Update']

export type Phonetics = Database['public']['Tables']['phonetics']['Row']
export type InsertPhonetics = Database['public']['Tables']['phonetics']['Insert']
export type UpdatePhonetics = Database['public']['Tables']['phonetics']['Update']

export type Word = Database['public']['Tables']['word']['Row']
export type InsertWord = Database['public']['Tables']['word']['Insert']
export type UpdateWord = Database['public']['Tables']['word']['Update']

// Schema: storage
// Tables
export type Buckets = Database['storage']['Tables']['buckets']['Row']
export type InsertBuckets = Database['storage']['Tables']['buckets']['Insert']
export type UpdateBuckets = Database['storage']['Tables']['buckets']['Update']

export type Migrations = Database['storage']['Tables']['migrations']['Row']
export type InsertMigrations = Database['storage']['Tables']['migrations']['Insert']
export type UpdateMigrations = Database['storage']['Tables']['migrations']['Update']

export type Objects = Database['storage']['Tables']['objects']['Row']
export type InsertObjects = Database['storage']['Tables']['objects']['Insert']
export type UpdateObjects = Database['storage']['Tables']['objects']['Update']

export type S3MultipartUploads = Database['storage']['Tables']['s3_multipart_uploads']['Row']
export type InsertS3MultipartUploads =
  Database['storage']['Tables']['s3_multipart_uploads']['Insert']
export type UpdateS3MultipartUploads =
  Database['storage']['Tables']['s3_multipart_uploads']['Update']

export type S3MultipartUploadsParts =
  Database['storage']['Tables']['s3_multipart_uploads_parts']['Row']
export type InsertS3MultipartUploadsParts =
  Database['storage']['Tables']['s3_multipart_uploads_parts']['Insert']
export type UpdateS3MultipartUploadsParts =
  Database['storage']['Tables']['s3_multipart_uploads_parts']['Update']

// Functions
export type ArgsCanInsertObject = Database['storage']['Functions']['can_insert_object']['Args']
export type ReturnTypeCanInsertObject =
  Database['storage']['Functions']['can_insert_object']['Returns']

export type ArgsExtension = Database['storage']['Functions']['extension']['Args']
export type ReturnTypeExtension = Database['storage']['Functions']['extension']['Returns']

export type ArgsFilename = Database['storage']['Functions']['filename']['Args']
export type ReturnTypeFilename = Database['storage']['Functions']['filename']['Returns']

export type ArgsFoldername = Database['storage']['Functions']['foldername']['Args']
export type ReturnTypeFoldername = Database['storage']['Functions']['foldername']['Returns']

export type ArgsGetSizeByBucket = Database['storage']['Functions']['get_size_by_bucket']['Args']
export type ReturnTypeGetSizeByBucket =
  Database['storage']['Functions']['get_size_by_bucket']['Returns']

export type ArgsListMultipartUploadsWithDelimiter =
  Database['storage']['Functions']['list_multipart_uploads_with_delimiter']['Args']
export type ReturnTypeListMultipartUploadsWithDelimiter =
  Database['storage']['Functions']['list_multipart_uploads_with_delimiter']['Returns']

export type ArgsListObjectsWithDelimiter =
  Database['storage']['Functions']['list_objects_with_delimiter']['Args']
export type ReturnTypeListObjectsWithDelimiter =
  Database['storage']['Functions']['list_objects_with_delimiter']['Returns']

export type ArgsOperation = Database['storage']['Functions']['operation']['Args']
export type ReturnTypeOperation = Database['storage']['Functions']['operation']['Returns']

export type ArgsSearch = Database['storage']['Functions']['search']['Args']
export type ReturnTypeSearch = Database['storage']['Functions']['search']['Returns']
