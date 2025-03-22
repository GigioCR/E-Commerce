const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

class SupabaseClient {
  static instance = null
  constructor() {
    if (SupabaseClient.instance) {
      throw new Error('You cannot create multiple instances of SupabaseClient')
    }
  } 

  static getInstance() {
    if (!SupabaseClient.instance) {
      const supabaseUrl = 'https://hlkdwixhbqrbgwgcnocq.supabase.co'
      const supabaseKey = process.env.SUPABASE_KEY

      if (!supabaseKey) {
        throw new Error('Missing SUPABASE_KEY environment variable')
      }

      SupabaseClient.instance = createClient(supabaseUrl, supabaseKey)
    }

    return SupabaseClient.instance
  }
}

const supabase = SupabaseClient.getInstance()
module.exports = supabase