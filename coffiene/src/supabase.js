const { SupabaseClient } = require("@supabase/supabase-js");

const supabase = new SupabaseClient(
  "https://orbnotirwvdxfyasqpxe.supabase.co", //process.env.SUPABASE_URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yYm5vdGlyd3ZkeGZ5YXNxcHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY0ODkxOTIsImV4cCI6MjAxMjA2NTE5Mn0.QNjgtLY7SrFWyD9d2z45PlLlKIcd8jD1ghpnjPHQk3I" //process.env.SUPABASE_ANON_KEY
);

module.exports = {
  supabase,
};
