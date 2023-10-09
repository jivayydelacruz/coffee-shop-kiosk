const { SupabaseClient } = require("@supabase/supabase-js");

const supabase = new SupabaseClient(
  "https://ycqarkitulzvkawcpnbe.supabase.co", //process.env.SUPABASE_URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljcWFya2l0dWx6dmthd2NwbmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY0MjIxNzEsImV4cCI6MjAxMTk5ODE3MX0.UgfNedtCqV6wS4vId7GXNmFn7wIhX27f5EQyr5lIw98" //process.env.SUPABASE_ANON_KEY
);

module.exports = {
  supabase,
};
