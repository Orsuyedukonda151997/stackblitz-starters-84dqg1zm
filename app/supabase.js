import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://iflkpailloixhhnibppz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmbGtwYWlsbG9peGhobmlicHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMjU2MjcsImV4cCI6MjA4NzcwMTYyN30.M-4LQH29OIVrVGW-A0Q6BkhDZVhoSFzjdQddL_ap9xA"
);
